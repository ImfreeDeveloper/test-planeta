<template>
  <div class="registartion" :class="{ disabled: loading }">
    <h1 class="title">Регистрация / Авторизация</h1>
    <h2 class="subtitle">Подтверждение номера телефона</h2>
    <div class="text">
      <p>Мы отправлили SMS с проверочным кодом на номер <strong>{{ phone }}</strong></p>
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
import { required, minLength } from 'vuelidate/lib/validators'
import FieldCode from '../fieldsInput/FieldCode.vue'
import repeatSend from '../RepeatSend.vue'
import { eventBus } from '../../js/main'
import { STEP_SMS, STEP_DATA, STEP_PHONE } from '../../js/constants'
import * as authApi from '../../api/auth'
import * as LS from '../../js/localStorage'

export default {
  components: {
    FieldCode,
    repeatSend
  },
  data () {
    return {
      code: '',
      phone: '',
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
  methods: {
    stepPhone () {
      eventBus.$emit('step', STEP_PHONE)
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
          eventBus.$emit('step', STEP_DATA)
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
  },
  mounted () {
    LS.setStep(STEP_SMS)
    this.phone = LS.getPhone()
  }
}
</script>
