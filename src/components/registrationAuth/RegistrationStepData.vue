<template>
  <div class="registartion">
    <h1 class="title">Мои данные</h1>
    <h2 class="subtitle">Дополнительная информация</h2>
    <div class="text">
      <p>Для возможности участия в акциях укажите, пожалуйста, дополнительную информацию о себе.</p>
    </div>
    <Field
      label="Электронная почта*"
      validErrorText="Не верная почта"
      :validError="$v.email.$error"
      v-model="email"
      @blur="validateField('email')"
    />
    <Field
      label="Фамилия*"
      validErrorText="Поле «Фамилия» не заполнено"
      :validError="$v.surname.$error"
      v-model="surname"
      @blur="validateField('surname')"
    />
    <Field
      label="Имя*"
      validErrorText="Поле «Имя» не заполнено"
      :validError="$v.name.$error"
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
import { required } from 'vuelidate/lib/validators'
import Field from '../fieldsInput/Field.vue'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
import { eventBus } from '../../js/main'
import { STEP_QR } from '../../js/constants'

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
      ]
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
      required
      // validSummaPromo (summa) {
      //   const summaNoSpace = summa.replace(/\D/g, '')
      //   return summaNoSpace >= 3000
      // }
    },
    surname: {
      required
    },
    name: {
      required
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
  }
}
</script>
