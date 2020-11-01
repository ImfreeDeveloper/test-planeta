<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 ₽</h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <FieldSearch />
    <div class="registartion__scan">
      <ScanQr />
      <FieldDate />
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
import FieldSearch from './FieldSearch.vue'
import FieldDate from './FieldDate.vue'
import AttachFile from './AttachFile.vue'
import ScanQr from './ScanQr.vue'
export default {
  components: {
    FieldSearch,
    FieldDate,
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
