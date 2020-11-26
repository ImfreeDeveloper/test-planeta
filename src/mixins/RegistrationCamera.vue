<script>
import { mapGetters, mapActions } from 'vuex'
import FieldSearch from '../components/fieldsInput/FieldSearch.vue'
import FieldDate from '../components/fieldsInput/FieldDate.vue'
import Field from '../components/fieldsInput/Field.vue'
import * as infoApi from '../js/api/info'
import { STEP_LAST } from '../js/constants'
import { parseDateForSend } from '../js/utils'

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
      fileScanQr: '',
      isDisabledField: false,
      isDisabledStore: false,
      isShowField: false,
      loadingSend: false,
      paramsScan: {}
    }
  },
  computed: {
    ...mapGetters(['stores', 'user', 'datesPromo', 'promoMinAmount', 'linkRules']),
    storesItems () {
      return Object.keys(this.stores).map((store, idx) => {
        return {
          id: idx,
          name: store
        }
      })
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
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loadingSend = true
        const fileBase64 = await this.toBase64(this.fileScanQr.file || this.file)
        const obj = {
          phone: this.user.phone,
          email: this.user.email,
          send_in_sms: false,
          last_name: this.user.surname,
          first_name: this.user.name,
          city: this.user.city.name,
          district: this.user.district.name,
          store: this.store.name,
          use_loyalty_card: false,
          invoice_photo: fileBase64,
          invoice_fn: this.fileScanQr.fn || this.paramsScan.fn,
          invoice_fp: this.fileScanQr.fp || this.paramsScan.fp,
          invoice_i: this.fileScanQr.i || this.paramsScan.i,
          no_qr: false,
          amount: this.summaPromo.replace(/\s/g, ''),
          purchase_date: parseDateForSend(this.datePromo),
          personal_data: true,
          personal_communication: true,
          google_client_id: window.ga.getAll()[0].get('clientId')
        }
        try {
          const data = await infoApi.send(obj)
          setTimeout(() => {
            console.log(data)
            if (data.success) {
              this.setStep(STEP_LAST)
            } else {
              alert(data.error)
            }
            this.loadingSend = false
          }, 600)
        } catch (error) {
          alert('Ошибка регистрации')
          this.loadingSend = false
        }
      }
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
  }
}
</script>
