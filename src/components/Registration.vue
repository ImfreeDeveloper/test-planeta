<template>
  <div class="registartion">
    <h1 class="registartion__title">Авто за 3000 ₽</h1>
    <h2 class="registartion__subtitle">Регистрация чека</h2>
    <div class="wrp-field">
      <label>Дата покупки*</label>
      <div class="wrp-input">
        <input type="text" placeholder="" />
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
    <button class="btn btn-primary">Зарегистрировать купон</button>
  </div>
</template>

<script>
export default {}
</script>
