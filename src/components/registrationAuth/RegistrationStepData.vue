<template>
  <div class="registartion">
    <h1 class="title">Мои данные</h1>
    <h2 class="subtitle">Дополнительная информация</h2>
    <div class="text">
      <p>Для возможности участия в акциях укажите, пожалуйста, дополнительную информацию о себе.</p>
    </div>
    <Field
      label="Электронная почта*"
      :validErrorText="textError.email"
      :validError="$v.email"
      v-model="email"
      @blur="validateField('email')"
    />
    <Field
      label="Фамилия*"
      :validErrorText="textError.surname"
      :validError="$v.surname"
      v-model="surname"
      @blur="validateField('surname')"
    />
    <Field
      label="Имя*"
      :validErrorText="textError.name"
      :validError="$v.name"
      v-model="name"
      @blur="validateField('name')"
    />
    <FieldSearch
      label="Город*"
      :items="сitiesItems"
      validErrorText="Город не выбран"
      :validError="$v.city.$error"
      v-model="city"
      @blur="validateField('city')"
    />
    <FieldSearch
      label="Район*"
      :items="districtsItems"
      validErrorText="Район не выбран"
      :validError="$v.district.$error"
      v-model="district"
      @blur="validateField('district')"
    />
    <button class="btn btn-primary mt3 mb2" @click="submitHandler">Далее</button>
  </div>
</template>

<script>
import { required, email, minLength, helpers } from 'vuelidate/lib/validators'
import Field from '../fieldsInput/Field.vue'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import { eventBus } from '../../js/main'
import { STEP_DATA, STEP_QR } from '../../js/constants'
import * as LS from '../../js/localStorage'

export default {
  components: {
    Field,
    FieldSearch
  },
  data () {
    return {
      email: '',
      surname: '',
      name: '',
      district: '',
      city: '',
      сitiesItems: [
        {
          id: 0,
          name: 'Уфа'
        },
        {
          id: 1,
          name: 'Москва'
        },
        {
          id: 2,
          name: 'Санкт-Петербург'
        },
        {
          id: 3,
          name: 'Казань'
        }
      ],
      districtsItems: [
        {
          id: 0,
          name: 'Район1'
        },
        {
          id: 1,
          name: 'Район2'
        },
        {
          id: 2,
          name: 'Район3'
        },
        {
          id: 3,
          name: 'Район4'
        }
      ],
      textError: {
        email: {
          required: 'Поле «Электронная почта» не заполнено',
          email: 'Некорректный формат E-mail. Поле должно содержать минимум 6 символов, цифры или буквы латинского алфавита.'
        },
        surname: {
          required: 'Поле «Фамилия» не заполнено',
          minLength: 'Минимум 2 символа',
          ru: 'Некорректный формат. Поле должно содержать буквы русского алфавита.'
        },
        name: {
          required: 'Поле «Имя» не заполнено',
          minLength: 'Минимум 2 символа',
          ru: 'Некорректный формат. Поле должно содержать буквы русского алфавита.'
        }
      }
    }
  },
  validations: {
    city: {
      required
    },
    district: {
      required
    },
    email: {
      required,
      email
      // validSummaPromo (summa) {
      //   const summaNoSpace = summa.replace(/\D/g, '')
      //   return summaNoSpace >= 3000
      // }
    },
    surname: {
      required,
      minLength: minLength(2),
      ru (val) {
        return val.length < 2 || /[а-яё]+/i.test(val)
      }
    },
    name: {
      required,
      minLength: minLength(2),
      ru (val) {
        return val.length < 2 || /[а-яё]+/i.test(val)
      }
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        eventBus.$emit('step', STEP_QR)
      }
    }
  },
  mounted () {
    LS.setStep(STEP_DATA)
  }
}
</script>
