<template>
  <div class="registartion">
    <Loader v-if="loading" />
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
      :validError="$v.summaPromo"
      :maxLength="9"
      v-model="summaPromo"
      v-if="isShowField"
      @keyup="setFormat"
      @blur="validateField('summaPromo')"
      :isDisabled="isDisabledField"
    />
    <field-scan-attach-file v-model="fileScanQr" />
    <button
      class="btn btn-primary"
      @click="submitHandler"
      v-if="isShowField && !$v.$invalid"
    >
      Зарегистрировать купон
    </button>

  </div>
</template>

<script>
import fieldScanAttachFile from '../fieldsInput/FieldScanAttachFile.vue'
import { STEP_LAST } from '../../js/constants'
import Loader from '../../components/Loader.vue'
import RegistrationCamera from '../../mixins/RegistrationCamera.vue'

export default {
  components: {
    fieldScanAttachFile,
    Loader
  },
  data () {
    return {
      fileScanQr: '',
      loading: false
    }
  },
  mixins: [RegistrationCamera],
  methods: {
    submitHandler () {
      this.$v.$touch()
      console.log(`Файл: ${this.file}`)
      if (!this.$v.$invalid) {
        this.setStep(STEP_LAST)
      }
    },
    getDataScan (params) {
      if (params.date) {
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
      } else {
        this.datePromo = ''
        this.summaPromo = ''
        this.isDisabledField = false
        this.isShowField = false
      }
    }
  },
  watch: {
    fileScanQr (params) {
      if (params) {
        this.getDataScan(params)
      } else {
        this.isShowField = false
      }
    }
  }
}
</script>
