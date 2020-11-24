<template>
  <div class="registartion">
    <h1 class="title">Авто за 3000 <i class="rub"></i></h1>
    <h2 class="subtitle">Поздравляем!</h2>
    <div class="text">
      <p>Ваш купон успешно зарегистрирован.</p>
      <p>Если Вы хотите зарегистрировать ещё один купон, перейдите по ссылке ниже.</p>
    </div>
    <button class="btn btn-primary mt3 mb2" @click="stepQR">Ещё один ЧЕК</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { STEP_QR } from '../js/constants'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions(['setStep']),
    stepQR () {
      this.setStep(STEP_QR)
    }
  }
}
</script>
