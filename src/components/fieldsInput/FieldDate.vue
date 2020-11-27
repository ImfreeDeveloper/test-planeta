<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError}"
  >
    <label>{{ label }}</label>
    <div class="wrp-input"
      :class="{'wrp-field_disabled': isDisabled}"
    >
      <input
        placeholder=""
        type="text"
        :value="value"
        v-on="inputListeners"
        v-mask="'##.##.####'"
        :disabled="isDisabled"
      />
      <div class="wrp-field__icon">
        <svg class="icon-date">
          <use xlink:href="/images/svg/sprite.svg#icon-svg-date"></use>
        </svg>
      </div>
    </div>
    <p class="wrp-field__error" v-if="validError">
      {{ validErrorText }}
    </p>
    <a href="#" class="link" v-if="linkToScrollScan" @click="scrollToScan">Попробуйте зарегистрировать другой чек.</a>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'value',
    'validError',
    'validErrorText',
    'isDisabled',
    'linkToScrollScan'
  ],
  methods: {
    scrollToScan () {
      this.$scrollTo(document.querySelector('.scan-qr'))
    }
  },
  computed: {
    inputListeners: function () {
      let vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>
