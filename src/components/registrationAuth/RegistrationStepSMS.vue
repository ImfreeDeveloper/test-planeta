<template>
  <div class="registartion">
    <h1 class="title">Регистрация / Авторизация</h1>
    <h2 class="subtitle">Подтверждение номера телефона</h2>
    <div class="text">
      <p>Мы отправлили SMS с проверочным кодом на номер <strong>+7 (925) 084-78-88.</strong></p>
      <p>Введите его в форме ниже для продолжения регистрации / авторизации.</p>
    </div>
    <FieldCode
      label="Код из SMS*"
      :validErrorAPI="validErrorCodeAPI"
      :validError="$v.code"
      v-model="code"
      @blur="validateField('code')"
    />
    <button class="btn btn-primary mt3 mb2" @click="submitHandler">Подтвердить</button>
    <repeat-send />
    <a href="#" class="link" @click.prevent="stepPhone">Изменить номер телефона</a>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import FieldCode from '../fieldsInput/FieldCode.vue'
import repeatSend from '../RepeatSend.vue'
import { eventBus } from '../../js/main'
import { STEP_DATA, STEP_PHONE } from '../../js/constants'

export default {
  components: {
    FieldCode,
    repeatSend
  },
  data () {
    return {
      code: '',
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
    submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        eventBus.$emit('step', STEP_DATA)
      }
    }
  }
}
</script>
