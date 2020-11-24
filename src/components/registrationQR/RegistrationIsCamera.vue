<template>
  <div class="registartion">
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
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import FieldDate from '../fieldsInput/FieldDate.vue'
import Field from '../fieldsInput/Field.vue'
import AttachFile from '../attachFile/AttachFile.vue'
import ScanQr from '../scanQR/ScanQr.vue'
import { STEP_LAST } from '../../js/constants'
import * as infoApi from '../../js/api/info'

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
      store: '',
      isErrorScan: false,
      fileScanQr: '',
      isDisabledField: false,
      isDisabledStore: false,
      isShowField: false,
      showInfoReceipt: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['stores']),
    storesItems () {
      return Object.keys(this.stores).map((store, idx) => {
        return {
          id: idx,
          name: store
        }
      })
    }
  },
  validations: {
    store: {
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
        this.setStep(STEP_LAST)
      }
    },
    setFormat (e) {
      let value = e.target.value
      this.summaPromo = value
        .replace(/\D/g, '')
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
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
        this.showInfoReceipt = true
        this.fetchStore(params)
        this.$v.$touch()
      } else {
        this.datePromo = ''
        this.summaPromo = ''
        this.isDisabledField = false
        this.showInfoReceipt = false
        this.isShowField = false
      }
      this.isErrorScan = params.isError
    },
    async fetchStore (params) {
      this.loading = true
      try {
        const data = await infoApi.getStore({ fnn: params.fn })
        setTimeout(() => {
          if (data.success) {
            const currentStore = this.storesItems.filter(store => store.name === data.results.store)
            if (currentStore.length) {
              this.store = currentStore[0]
              this.isDisabledStore = true
            } else {
              this.isDisabledStore = false
              this.store = ''
            }
          } else {
            this.isDisabledStore = false
            this.store = ''
          }
          this.loading = false
        }, 600)
      } catch (error) {
        this.loading = false
        this.isDisabledStore = false
        this.store = ''
        console.log(error)
      }
    }
  }
}
</script>
