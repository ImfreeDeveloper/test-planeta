<template>
  <div class="wrp-field" :class="{'is-danger': !valid}">
    <label>Дата покупки*</label>
    <div class="wrp-input">
      <masked-input v-model="date" mask="11.11.1111" placeholder="" type="text"/>
      <div class="wrp-field__icon">
        <svg class="icon-date">
          <use xlink:href="/images/svg/sprite.svg#icon-svg-date"></use>
        </svg>
      </div>
    </div>
    <p class="wrp-field__error" v-if="!valid">
      Дата покупки не соответствует условиям акции.
    </p>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
export default {
  components: {
    MaskedInput
  },
  data () {
    return {
      date: '',
      valid: true
    }
  },
  watch: {
    date (value) {
      // Задаем условия акции с 1.10.2020 по текущую дату
      const startDatePromo = new Date(2020, 9, 1)
      const currentDatePromo = new Date()
      // Проверим введеную дату
      const arrD = value.split('.')
      arrD[1] -= 1
      const d = new Date(arrD[2], arrD[1], arrD[0])
      if (d >= startDatePromo && d <= currentDatePromo) {
        this.valid = true
      } else {
        this.valid = false
      }
      // if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
      //   return true
      // } else {
      //   alert('Введена некорректная дата!')
      //   return false
      // }
    }
  }
}

// function validate_date (value) {
//   var arrD = value.split('.')
//   arrD[1] -= 1
//   var d = new Date(arrD[2], arrD[1], arrD[0])
//   if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
//     return true
//   } else {
//     alert('Введена некорректная дата!')
//     return false
//   }
// }
</script>
