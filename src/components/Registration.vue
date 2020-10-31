<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 ₽</h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <FieldSearch />
    <div class="registartion__scan">
      <ScanQr />
      <div class="wrp-field">
        <label>Дата покупки*</label>
        <div class="wrp-input">
          <masked-input v-model="date" mask="11.11.1111" placeholder="" type="text"/>
          <div class="wrp-field__icon">
            <svg class="icon-date">
              <use xlink:href="/images/svg/sprite.svg#icon-svg-date"></use>
            </svg>
          </div>
        </div>
        <!-- <p class="wrp-field__error">
        Дата покупки не соответствует условиям акции.
      </p> -->
      </div>
      <div class="wrp-field">
        <label>Сумма покупки*</label>
        <div class="wrp-input">
          <input type="text" placeholder="" />
        </div>
      </div>
      <AttachFile />
    </div>

    <button class="btn btn-primary">Зарегистрировать купон</button>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import FieldSearch from './FieldSearch.vue'
import AttachFile from './AttachFile.vue'
import ScanQr from './ScanQr.vue'
export default {
  components: {
    MaskedInput,
    FieldSearch,
    AttachFile,
    ScanQr
  },
  data () {
    return {
      date: ''
    }
  }
}
</script>
