<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError}"
  >
    <label>{{ label }}</label>
    <div class="wrp-input">
      <input
        placeholder=""
        type="text"
        :value="value"
        v-on="inputListeners"
        v-mask="'##.##.####'"
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
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'value',
    'validError',
    'validErrorText'
  ],
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
