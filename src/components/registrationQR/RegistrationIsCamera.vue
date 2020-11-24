<template>
  <div>
    <FieldSearch
      label="Магазин покупки*"
      :items="storesItems"
      :validErrorText="{'required' : 'Магазин не выбран'}"
      :validError="$v.store"
      v-model="store"
      v-if="showInfoReceipt"
      @blur="validateField('store')"
      :isDisabled="isDisabledField && isDisabledStore"
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
        :isDisabled="isDisabledField"
      />
      <Field
        label="Сумма покупки*"
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
      <attach-file v-model="file" />
      <button class="btn btn-primary" @click="submitHandler">
        Зарегистрировать купон
      </button>
    </div>
  </div>
</template>

<script>
import AttachFile from '../attachFile/AttachFile.vue'
import ScanQr from '../scanQR/ScanQr.vue'
import { STEP_LAST } from '../../js/constants'
import RegistrationCamera from '../../mixins/RegistrationCamera.vue'

export default {
  components: {
    AttachFile,
    ScanQr
  },
  data () {
    return {
      isErrorScan: false,
      file: '',
      fileScanQr: '',
      showInfoReceipt: false
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
        this.store = ''
        const summaPromo = params.summa
          .replace(/\..*/, '')
          .replace(/\D/g, '')
          .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
        this.datePromo = params.date
        this.summaPromo = summaPromo
        this.isDisabledField = true
        this.isShowField = true
        this.showInfoReceipt = true
        this.fetchStore(params)
        this.$v.$touch()
      } else {
        this.store = ''
        this.datePromo = ''
        this.summaPromo = ''
        this.isDisabledField = false
        this.showInfoReceipt = false
        this.isShowField = false
      }
      this.isErrorScan = params.isError
    }
  }
}
</script>
