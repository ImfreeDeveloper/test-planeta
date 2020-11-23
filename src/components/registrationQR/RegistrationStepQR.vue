<template>
  <div class="registartion">
    <h1 class="title">Авто за 3000 <i class="rub"></i></h1>
    <h2 class="subtitle">Регистрация чека</h2>
    <div v-show="availableCamera === 'available'">
      <FieldSearch
        label="Магазин покупки*"
        :items="storesItems"
        :validErrorText="{'required' : 'Магазин не выбран'}"
        :validError="$v.store"
        v-model="store"
        @blur="validateField('store')"
        :isDisabled="isDisabledField && isDisabledStore"
      />
      <ScanQr @handlerScan="fetchStore" @handlerAvailable="setAvailableCamera"/>
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
    <registration-not-camera v-if="availableCamera === 'notAvailable'"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import FieldDate from '../fieldsInput/FieldDate.vue'
import Field from '../fieldsInput/Field.vue'
import AttachFile from '../attachFile/AttachFile.vue'
import ScanQr from './ScanQr.vue'
import { STEP_LAST } from '../../js/constants'
import RegistrationNotCamera from './RegistrationNotCamera.vue'
import * as infoApi from '../../js/api/info'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field,
    AttachFile,
    ScanQr,
    RegistrationNotCamera
  },
  data () {
    return {
      datePromo: '',
      summaPromo: '',
      store: '',
      isErrorScan: false,
      showInfoReceipt: false,
      loading: false,
      file: null,
      availableCamera: null,
      isDisabledField: false,
      isDisabledStore: false
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
      console.log(data)
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
    },
    setAvailableCamera (val) {
      this.availableCamera = val
      this.$store.commit('setLoading', false)
    },
    async fetchStore (params) {
      this.isErrorScan = params.isError
      if (params.isError) return
      this.loading = true
      try {
        const data = await infoApi.getStore({ fnn: params.fn })
        if (data.success) {}
        setTimeout(() => {
          console.log(data)
          this.getDataScan(params)
          this.isDisabledStore = data.success
          this.isDisabledField = true
          this.loading = false
        }, 600)
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  mounted () {
    this.$store.commit('setLoading', true)
    console.log(window.ga.getAll()[0].get('clientId'))
  }
}
</script>
