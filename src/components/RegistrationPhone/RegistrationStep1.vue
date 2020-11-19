<template>
  <div class="registartion">
    <h1 class="title">Регистрация / Авторизация</h1>
    <div class="text">
      <p>
        Для начала регистрации или авторизации укажите, пожалуйста, ваш номер
        телефона.
      </p>
    </div>
    <Field
      label="Телефон*"
      validErrorText="Введите телефон"
      :validError="$v.phone.$error"
      :maxLength="9"
      v-model="phone"
      @blur="validateField('phone')"
    >
    </Field>
    <FieldCheck
      :validError="$v.iagree.$error"
      validErrorText="Error какой-то"
      @change="validateField('iagree')"
      v-model="iagree"
    >
      <template slot="txt">
        Согласен <a href="#" target="_blank">правилами</a> обработки персональных данных
      </template>
    </FieldCheck>
    <FieldCheck
      :validError="$v.iagreeC.$error"
      validErrorText="Error какой-то"
      @change="validateField('iagreeC')"
      v-model="iagreeC"
    >
      <template slot="txt">
        Согласен на получение персональной коммуникации
      </template>
    </FieldCheck>
    <button class="btn btn-primary mt3" @click="submitHandler">Далее</button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Field from '../Field.vue'
import FieldCheck from '../FieldCheck.vue'
import { eventBus } from '../../js/main'
import { STEP_SMS } from '../../js/constants'

export default {
  components: {
    Field,
    FieldCheck
  },
  data () {
    return {
      phone: '',
      iagree: false,
      iagreeC: false
    }
  },
  validations: {
    phone: {
      required
      // validSummaPromo (summa) {
      //   const summaNoSpace = summa.replace(/\D/g, '')
      //   return summaNoSpace >= 3000
      // }
    },
    iagree: {
      required
      // validIagree (check) {
      //   return check
      // }
    },
    iagreeC: {
      required
      // validIagree (check) {
      //   return check
      // }
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        eventBus.$emit('step', STEP_SMS)
      }
    }
  }
}
</script>
