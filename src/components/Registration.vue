<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 <i class="rub"></i></h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <FieldSearch
      label="Магазин покупки*"
      validErrorText="Магазин не выбран"
      :validError="$v.shop.$error"
      v-model="shop"
      @blur="validateField('shop')"
    />
    <ScanQr @handlerScan="getDataScan" />
    <button
      class="btn btn-primary"
      :disabled="!isErrorScan"
      v-if="!showInfoReceipt"
      @click="isErrorScan ? showInfoReceipt = true : false"
    >Ввести данные из чека</button>
    <div class="registartion__info-receipt" v-if="showInfoReceipt">
      <FieldDate
        label="Дата покупки*"
        validErrorText="Дата покупки не соответствует условиям акции."
        :validError="$v.datePromo.$error"
        v-model="datePromo"
        @blur="validateField('datePromo')"
      />
      <Field
        label="Сумма покупки*"
        validErrorText="Сумма покупки не соответствует условиям акции"
        :validError="$v.summaPromo.$error"
        :maxLength="9"
        v-model="summaPromo"
        @keyup="setFormat"
        @blur="validateField('summaPromo')"
      >
        <template slot="icon">
          <div class="wrp-field__icon wrp-field__icon-rub">
            <i class="rub"></i>
          </div>
        </template>
      </Field>
      <AttachFile />
      <button class="btn btn-primary" @click="submitHandler">
        Зарегистрировать купон
      </button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import FieldSearch from './FieldSearch.vue'
import FieldDate from './FieldDate.vue'
import Field from './Field.vue'
import AttachFile from './AttachFile.vue'
import ScanQr from './ScanQr.vue'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field,
    AttachFile,
    ScanQr
  },
  data () {
    return {
      datePromo: '',
      summaPromo: '',
      shop: '',
      isErrorScan: false,
      showInfoReceipt: false
    }
  },
  validations: {
    shop: {
      required
    },
    summaPromo: {
      required,
      validSummaPromo (summa) {
        const summaNoSpace = summa.replace(/\D/g, '')
        return summaNoSpace >= 3000
      }
    },
    datePromo: {
      required,
      validDatePromo (dt) {
        // Задаем условия акции с 1.10.2020 по текущую дату
        const startDatePromo = new Date(2020, 9, 1)
        const currentDatePromo = new Date()
        // Проверим введеную дату
        const arrD = dt.split('.')
        arrD[1] -= 1
        const d = new Date(arrD[2], arrD[1], arrD[0])
        return d >= startDatePromo && d <= currentDatePromo
      }
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log(`Магазин: ${this.shop.name}`)
        console.log(`Дата покупки: ${this.datePromo}`)
        console.log(`Сумма покупки: ${this.summaPromo}`)
      }
    },
    setFormat (e) {
      let value = e.target.value
      this.summaPromo = value
        .replace(/\D/g, '')
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    },
    getDataScan (data) {
      if (data.date) {
        const summaPromo = data.summa
          .replace(/\..*/, '')
          .replace(/\D/g, '')
          .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
        this.showInfoReceipt = true
        this.datePromo = data.date
        this.summaPromo = summaPromo
        this.$v.$touch()
      } else {
        this.showInfoReceipt = false
        this.datePromo = ''
        this.summaPromo = ''
      }
      this.isErrorScan = data.isError
    }
  }
}
</script>
