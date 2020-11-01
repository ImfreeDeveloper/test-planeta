<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 ₽</h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <FieldSearch />
    <div class="registartion__scan">
      <ScanQr />
      <FieldDate
        label="Дата покупки*"
        validErrorText="Дата покупки не соответствует условиям акции."
        :validError="$v.datePromo.$error"
        v-model="datePromo"
        @blur="validateField('datePromo')"
      />
      <Field
        label="Сумма покупки*"
        validErrorText="Сумма покупки не соответствует условиям акции"
        :validError="$v.summaPromo.$error"
        v-model="summaPromo"
        @blur="validateField('summaPromo')"
      />
      <AttachFile />
    </div>

    <button class="btn btn-primary" @click="submitHandler">Зарегистрировать купон</button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import FieldSearch from './FieldSearch.vue'
import FieldDate from './FieldDate.vue'
import Field from './Field.vue'
import AttachFile from './AttachFile.vue'
import ScanQr from './ScanQr.vue'

export default {
  components: {
    FieldSearch,
    FieldDate,
    Field,
    AttachFile,
    ScanQr
  },
  data () {
    return {
      datePromo: '',
      summaPromo: ''
    }
  },
  validations: {
    summaPromo: {
      required,
      validSummaPromo (summa) {
        return summa >= 3000
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
        return (d >= startDatePromo && d <= currentDatePromo)
      }
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    submitHandler () {
      this.$v.$touch()
    }
  }
}
</script>
