<template>
  <div class="registartion" :class="{ disabled: loading }">
    <h1 class="title">Регистрация / Авторизация</h1>
    <div class="text">
      <p>
        Для начала регистрации или авторизации укажите, пожалуйста, ваш номер
        телефона.
      </p>
    </div>
    <FieldPhone
      label="Телефон*"
      :validErrorAPI="validErrorPhoneAPI"
      :validError="$v.phone"
      v-model="phone"
      @blur="validateField('phone')"
    />
    <FieldCheck
      :validError="$v.iagreePD.$error"
      validErrorText="Необходимо согласиться с правилами обработки персональных данных."
      @change="validateField('iagreePD')"
      v-model="iagreePD"
    >
      <template slot="label-descr">
        Согласен <a href="#" target="_blank">правилами</a> обработки
        персональных данных
      </template>
    </FieldCheck>
    <FieldCheck v-model="iagreePC">
      <template slot="label-descr">
        Согласен на получение персональной коммуникации
      </template>
    </FieldCheck>
    <button
      class="btn btn-primary mt3"
      @click="submitHandler"
      :disabled="loading"
    >
      <span class="btn-loader" v-if="loading"></span>
      Далее
    </button>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import FieldPhone from '../fieldsInput/FieldPhone.vue'
import FieldCheck from '../fieldsInput/FieldCheck.vue'
// import { eventBus } from '../../js/main'
// import { STEP_SMS } from '../../js/constants'
import * as authApi from '../../api/auth'

export default {
  components: {
    FieldPhone,
    FieldCheck
  },
  data () {
    return {
      phone: '',
      iagreePD: true,
      iagreePC: true,
      loading: false,
      validErrorPhoneAPI: {
        isError: false,
        message: ''
      }
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(22)
    },
    iagreePD: {
      sameAs (check) {
        return check
      }
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        this.validErrorPhoneAPI = {
          isError: false,
          message: ''
        }
        try {
          const data = await authApi.sendToken({ phone: this.phone })
          setTimeout(() => {
            console.log(data)
            // eventBus.$emit('step', STEP_SMS)
          }, 1000)
        } catch (error) {
          console.log(error)
          this.validErrorPhoneAPI = {
            isError: true,
            message: 'Ошибка сервера'
          }
        }

        this.loading = false
      }
    }
  }
}
</script>
