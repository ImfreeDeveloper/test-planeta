<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError}"
  >
    <div class="wrp-input">
      <label class="checkbox-wrap">
        <input
          class="checkbox"
          type="checkbox"
          name="checkbox-iagree"
          v-on="inputListeners"
          :value="value"
          :checked="value"
        />
        <span class="checkbox-custom"></span>
        <span class="label">
          <slot name="label-descr"></slot>
        </span
        >
      </label>
    </div>
    <p class="wrp-field__error" v-if="validError">
      {{ validErrorText }}
    </p>
  </div>
</template>

<script>

export default {
  props: [
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
            vm.$emit('input', event.target.checked)
          }
        }
      )
    }
  }
}
</script>
