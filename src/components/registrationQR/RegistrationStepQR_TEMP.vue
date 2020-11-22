<template>
  <div class="registartion">
    <h1 class="title">Авто за 3000 <i class="rub"></i></h1>
    <h2 class="subtitle">Регистрация чека</h2>
    <!-- Если нет камеры или отклоненно НАЧАЛО -->
    <FieldSearch
      label="Магазин покупки*"
      :items="itemsShops"
      validErrorText="Магазин не выбран"
      :validError="$v.shop.$error"
      v-model="shop"
      @blur="validateField('shop')"
    />
    <FieldDate
      label="Дата покупки*"
      validErrorText="Дата покупки не соответствует условиям акции."
      :validError="$v.datePromo.$error"
      v-model="datePromo"
      @blur="validateField('datePromo')"
    />
    <Field
      label="Сумма покупки*"
      :validError="$v.summaPromo"
      :maxLength="9"
      v-model="summaPromo"
      @keyup="setFormat"
      @blur="validateField('summaPromo')"
    />
    <field-scan-attach-file v-model="fileScanQr" />
    <button class="btn btn-primary" @click="submitHandler">
      Зарегистрировать купон
    </button>
    <!-- Если нет камеры или отклоненно КОНЕЦ -->
    <!-- <FieldSearch
      label="Магазин покупки*"
      :items="itemsShops"
      validErrorText="Магазин не выбран"
      :validError="$v.shop.$error"
      v-model="shop"
      @blur="validateField('shop')"
    />
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
      <attach-file v-model="file" />
      <button class="btn btn-primary" @click="submitHandler">
        Зарегистрировать купон
      </button>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import FieldDate from '../fieldsInput/FieldDate.vue'
import Field from '../fieldsInput/Field.vue'
// import AttachFile from '../attachFile/AttachFile.vue'
import fieldScanAttachFile from '../fieldsInput/FieldScanAttachFile.vue'
import { STEP_LAST } from '../../js/constants'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field,
    // AttachFile,
    fieldScanAttachFile
  },
  data () {
    return {
      datePromo: '',
      summaPromo: '',
      shop: '',
      isErrorScan: false,
      showInfoReceipt: false,
      file: null,
      fileScanQr: null,
      itemsShops: [
        {
          id: 0,
          name: 'Adidas'
        },
        {
          id: 1,
          name: 'Adidas origin'
        },
        {
          id: 2,
          name: 'Oysx'
        },
        {
          id: 3,
          name: 'Bershka'
        },
        {
          id: 4,
          name: 'Pull & Bear'
        },
        {
          id: 5,
          name: 'Zara'
        }
      ]
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
    ...mapActions(['setStep']),
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
      console.log(`Файл: ${this.file}`)
      if (!this.$v.$invalid) {
        // console.log(`Дата покупки: ${this.datePromo}`)
        // console.log(`Сумма покупки: ${this.summaPromo}`)
        this.setStep(STEP_LAST)
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
  },
  watch: {
    fileScanQr (val) {
      this.getDataScan(val)
    }
  }
}
</script>
