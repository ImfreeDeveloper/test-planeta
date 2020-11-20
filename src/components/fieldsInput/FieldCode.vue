<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError.$error || validErrorAPI.isError}"
  >
    <label>{{ label }}</label>
    <div class="wrp-input">
      <input
        type="text"
        placeholder=""
        :value="value"
        v-on="inputListeners"
        v-mask="'######'"
      />
      <slot name="icon"></slot>
    </div>
    <p class="wrp-field__error" v-if="validError.$error && !validError.required">
      Введите код из SMS
    </p>
    <p class="wrp-field__error" v-if="validError.$error && !validError.minLength">
      Код состоит из 6 цифр
    </p>
    <p class="wrp-field__error" v-if="validErrorAPI.isError">
      {{ validErrorAPI.message }}
    </p>
  </div>
</template>

<script>

export default {
  props: [
    'label',
    'value',
    'validError',
    'validErrorAPI'
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
