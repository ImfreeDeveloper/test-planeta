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
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import FieldDate from '../fieldsInput/FieldDate.vue'
import Field from '../fieldsInput/Field.vue'
import fieldScanAttachFile from '../fieldsInput/FieldScanAttachFile.vue'
import { STEP_LAST } from '../../js/constants'
import Loader from '../../components/Loader.vue'
import * as infoApi from '../../js/api/info'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field,
    fieldScanAttachFile,
    Loader
  },
  data () {
    return {
      datePromo: '',
      summaPromo: '',
      store: '',
      fileScanQr: '',
      isDisabledField: false,
      isDisabledStore: false,
      isShowField: false,
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
        this.fetchStore(params)
        this.$v.$touch()
      } else {
        this.datePromo = ''
        this.summaPromo = ''
        this.isDisabledField = false
        this.isShowField = false
      }
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
