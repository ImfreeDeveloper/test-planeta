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
      :validErrorText="textError.city"
      :validError="$v.city"
      v-model="city"
      @blur="validateField('city')"
    />
    <FieldSearch
      label="Район*"
      :items="districtsItems"
      :validErrorText="textError.district"
      :validError="$v.district"
      v-model="district"
      @blur="validateField('district')"
    />
    <button class="btn btn-primary mt3 mb2" @click="submitHandler">Далее</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, email, minLength, requiredIf } from 'vuelidate/lib/validators'
import Field from '../fieldsInput/Field.vue'
import FieldSearch from '../fieldsInput/FieldSearch.vue'
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
        },
        district: {
          required: 'Поле «Район» не заполнено',
          sameAsCity: 'Сначала выберите город'
        },
        city: {
          required: 'Поле «Город» не заполнено'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['cities']),
    сitiesItems () {
      return Object.keys(this.cities).map((city, idx) => {
        return {
          id: idx,
          name: city
        }
      })
    },
    districtsItems () {
      return this.getDistricts(this.city)
    }
  },
  validations: {
    city: {
      required
    },
    district: {
      required,
      sameAsCity: requiredIf(function (nestedModel) {
        return !this.isOptional && nestedModel.someFlag
      })
    },
    email: {
      required,
      email
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
    ...mapActions(['setStep', 'setUserData']),
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.setStep(STEP_QR)
        this.setUserData({
          surname: this.surname,
          name: this.name,
          email: this.email
        })
      }
    },
    getDistricts (city) {
      let cityName = city ? city.name : Object.keys(this.cities)[0]
      const districts = this.cities[cityName]
      this.district = ''
      return districts.map((district, idx) => {
        return {
          id: city.id + '' + idx,
          name: district
        }
      })
    }
  },
  created () {
    // LS.setStep(STEP_DATA)
    // this.cities = LS.getCities()
  }
}

</script>
