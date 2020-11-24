<template>
  <div>
    <ScanQr @handlerScan="getDataScan" />
    <button
      class="btn btn-primary"
      :disabled="!isErrorScan"
      v-if="!showInfoReceipt && !showBtnAttachScan"
      @click="showBtnAttachScan = true;"
    >Ввести данные из чека</button>
    <scan-attach-file
      v-model="fileScanQr"
      v-if="showBtnAttachScan"
    />
    <div class="registartion__info-receipt" v-if="showInfoReceipt">
      <FieldSearch
        label="Магазин покупки*"
        :items="storesItems"
        :validErrorText="{'required' : 'Магазин не выбран'}"
        :validError="$v.store"
        v-model="store"
        @blur="validateField('store')"
        :isDisabled="isDisabledField && isDisabledStore"
      />
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
      <attach-file
        v-if="!showBtnAttachScan"
        validErrorText="Поле «Фото чека» не может быть пустым"
        :validError="$v.file"
        v-model="file"
      />
      <button
        class="btn btn-primary"
        @click="submitHandler"
        :disabled="loadingSend"
      >
        <span class="btn-loader" v-if="loadingSend"></span>
        Зарегистрировать купон
      </button>
    </div>
  </div>
</template>

<script>
import AttachFile from '../attachFile/AttachFile.vue'
import scanAttachFile from '../attachFile/ScanAttachFile.vue'
import { required } from 'vuelidate/lib/validators'
import ScanQr from '../scanQR/ScanQr.vue'
import RegistrationCamera from '../../mixins/RegistrationCamera.vue'

export default {
  components: {
    AttachFile,
    scanAttachFile,
    ScanQr
  },
  data () {
    return {
      isErrorScan: false,
      showInfoReceipt: false,
      file: '',
      showBtnAttachScan: false
    }
  },
  mixins: [RegistrationCamera],
  validations () {
    if (this.showBtnAttachScan) {
      return {
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
      }
    } else {
      return {
        file: {
          required
        },
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
      }
    }
  },
  methods: {
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
        this.showInfoReceipt = true
        this.fetchStore(params)
        this.$v.$touch()
        this.paramsScan = params
      } else {
        this.store = ''
        this.datePromo = ''
        this.summaPromo = ''
        this.fileScanQr = ''
        this.isDisabledField = false
        this.showInfoReceipt = false
        this.showBtnAttachScan = false
      }
      this.isErrorScan = params.isError
    }
  },
  watch: {
    file (params) {
      this.validateField('file')
    },
    fileScanQr (params) {
      if (!params) return
      if (params.date) {
        this.getDataScan(params)
      } else {
        this.store = ''
        this.datePromo = ''
        this.summaPromo = ''
        this.isDisabledField = false
        this.showInfoReceipt = true
      }
    }
  }

}
</script>
