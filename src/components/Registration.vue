<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 ₽</h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <FieldSearch />
    <div class="registartion__scan">
      <ScanQr />
      <FieldDate />
      <Field
        label="Сумма покупки*"
        validErrorText="Сумма покупки не соответствует условиям акции"
        :validError="$v.summa.$error"
        v-model="summa"
      />
      <AttachFile />
    </div>

    <button class="btn btn-primary">Зарегистрировать купон</button>
  </div>
</template>

<script>
// import { required, minLength } from 'vuelidate/lib/validators'
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
      date: '',
      summa: ''
    }
  },

  validations: {
    summa: {
      validSummaPromo (summa) {
        return summa >= 3000
      }
    }
  }
}
</script>
