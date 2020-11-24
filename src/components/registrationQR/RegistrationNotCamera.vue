<template>
  <div>
    <Loader v-if="loading" />
    <scan-attach-file
      v-model="fileScanQr"
    />
    <FieldSearch
      label="Магазин покупки*"
      :items="storesItems"
      :validErrorText="{'required' : 'Магазин не выбран'}"
      :validError="$v.store"
      v-model="store"
      v-if="isShowField"
      @blur="validateField('store')"
      :isDisabled="isDisabledField && isDisabledStore"
    />
    <FieldDate
      label="Дата покупки*"
      validErrorText="Дата покупки не соответствует условиям акции."
      :validError="$v.datePromo.$error"
      v-model="datePromo"
      v-if="isShowField"
      @blur="validateField('datePromo')"
      :isDisabled="isDisabledField"
    />
    <Field
      label="Сумма покупки*"
      v-if="isShowField"
      :validErrorText="{summaPromo: 'Сумма покупки не соответствует условиям акции.'}"
      :validError="$v.summaPromo"
      :maxLength="9"
      v-model="summaPromo"
      @keyup="setFormat"
      @blur="validateField('summaPromo')"
      :isDisabled="isDisabledField"
    >
      <template slot="icon">
        <div class="wrp-field__icon wrp-field__icon-rub">
          <i class="rub"></i>
        </div>
      </template>
    </Field>
    <button
      class="btn btn-primary"
      @click="submitHandler"
      v-if="isShowField"
      :disabled="loadingSend"
    >
      <span class="btn-loader" v-if="loadingSend"></span>
      Зарегистрировать купон
    </button>

  </div>
</template>

<script>
import scanAttachFile from '../attachFile/ScanAttachFile.vue'
import { required } from 'vuelidate/lib/validators'
import Loader from '../../components/Loader.vue'
import RegistrationCamera from '../../mixins/RegistrationCamera.vue'

export default {
  components: {
    scanAttachFile,
    Loader
  },
  data () {
    return {
      loading: false
    }
  },
  mixins: [RegistrationCamera],
  validations: {
    store: {
      required
    },
    summaPromo: {
      required,
      validSummaPromo (summa) {
        const summaNoSpace = summa.replace(/\D/g, '')
        return summaNoSpace >= +this.promoMinAmount
      }
    },
    datePromo: {
      required,
      validDatePromo (dt) {
        // Задаем условия акции с 1.10.2020 по текущую дату
        const startDatePromo = this.datesPromo.start
        const endDatePromo = this.datesPromo.end
        // Проверим введеную дату
        const arrD = dt.split('.')
        arrD[1] -= 1
        const d = new Date(arrD[2], arrD[1], arrD[0])
        return d >= startDatePromo && d <= endDatePromo
      }
    }
  },
  methods: {
    getDataScan (params) {
      const summaPromo = params.summa
        .replace(/\..*/, '')
        .replace(/\D/g, '')
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
      this.datePromo = params.date
      this.summaPromo = summaPromo
      this.isDisabledField = true
      this.isShowField = true
      this.fetchStore(params)
      this.$v.$touch()
    }
  },
  watch: {
    fileScanQr (params) {
      if (params.date) {
        this.getDataScan(params)
      } else {
        this.datePromo = ''
        this.summaPromo = ''
        this.store = ''
        this.isDisabledField = false
        this.isShowField = true
      }
    }
  }
}
</script>
