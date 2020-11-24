<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FieldSearch from '../components/fieldsInput/FieldSearch.vue'
import FieldDate from '../components/fieldsInput/FieldDate.vue'
import Field from '../components/fieldsInput/Field.vue'
import * as infoApi from '../js/api/info'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field
  },
  data () {
    return {
      datePromo: '',
      summaPromo: '',
      store: '',
      isDisabledField: false,
      isDisabledStore: false,
      isShowField: false
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
    fileScanQr: {
      required
    },
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
    setFormat (e) {
      let value = e.target.value
      this.summaPromo = value
        .replace(/\D/g, '')
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
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
