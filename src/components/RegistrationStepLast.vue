<template>
  <div class="registartion">
    <h1 class="title">Регистрация в акции «Ужасно чёрная пятница»</h1>
    <h2 class="subtitle">Поздравляем!</h2>
    <div class="text">
      <p>Ваш чек успешно зарегистрирован.</p>
      <p>Узнать номера ваших купонов и статус проверки чеков можно в <a href='/promo/send-coupons' class="link" target='_blank'>личном кабинете</a>.</p>
      <p>Если Вы хотите зарегистрировать ещё один чек, перейдите по ссылке ниже.</p>
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
