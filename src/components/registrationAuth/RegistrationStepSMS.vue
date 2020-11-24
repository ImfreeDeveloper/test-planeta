<template>
  <div class="registartion" :class="{ disabled: loading }">
    <h1 class="title">Регистрация / Авторизация</h1>
    <h2 class="subtitle">Подтверждение номера телефона</h2>
    <div class="text">
      <p>Мы отправлили SMS с проверочным кодом на номер <strong class="txt-no-wrap">{{ user.phone }}</strong></p>
      <p>Введите его в форме ниже для продолжения регистрации / авторизации.</p>
    </div>
    <FieldCode
      label="Код из SMS*"
      :validErrorAPI="validErrorCodeAPI"
      :validError="$v.code"
      v-model="code"
      @blur="validateField('code')"
    />
    <button
      class="btn btn-primary mt3 mb2"
      @click="submitHandler"
      :disabled="loading"
    >
      <span class="btn-loader" v-if="loading"></span>
      Подтвердить
    </button>
    <repeat-send />
    <a href="#" class="link" @click.prevent="stepPhone">Изменить номер телефона</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import FieldCode from '../fieldsInput/FieldCode.vue'
import repeatSend from '../RepeatSend.vue'
import { STEP_DATA, STEP_PHONE } from '../../js/constants'
import Cookies from 'js-cookie'

export default {
  components: {
    FieldCode,
    repeatSend
  },
  data () {
    return {
      code: '',
      loading: false,
      validErrorCodeAPI: {
        isError: false,
        message: ''
      }
    }
  },
  validations: {
    code: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['setStep', 'setUserData']),
    stepPhone () {
      this.setStep(STEP_PHONE)
    },
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        this.validErrorCodeAPI = {
          isError: false,
          message: ''
        }
        setTimeout(() => {
          this.loading = false
          this.setUserData({ smscode: this.code })
          // Запись в куки
          Cookies.set('c_auth', `${this.user.phone}_${this.code}`, { expires: 3 })
          this.setStep(STEP_DATA)
        }, 600)
        // try {
        //   const data = await authApi.checkToken({
        //     phone: this.phone,
        //     token: this.code
        //   })
        //   if (data.success) {
        //     setTimeout(() => {
        //       console.log(data)
        //       this.loading = false
        //       eventBus.$emit('step', STEP_DATA)
        //     }, 600)
        //   } else {
        //     this.validErrorCodeAPI = {
        //       isError: true,
        //       message: data.error
        //     }
        //     this.loading = false
        //     console.log(data)
        //   }
        // } catch (error) {
        //   console.log(error)
        //   this.loading = false
        //   this.validErrorCodeAPI = {
        //     isError: true,
        //     message: 'Ошибка сервера'
        //   }
        // }
      }
    }
  }
}
</script>
