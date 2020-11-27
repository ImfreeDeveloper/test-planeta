<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError.$error}"
  >
    <label>{{ label }}</label>
    <div class="wrp-input"
      :class="{'wrp-field_disabled': isDisabled}"
    >
      <input
        type="text"
        placeholder=""
        :value="value"
        v-on="inputListeners"
        :maxlength="maxLength ? maxLength : null"
        :disabled="isDisabled"
      />
      <slot name="icon"></slot>
    </div>
    <p
      class="wrp-field__error"
      v-for="(err, name) in validErrorText"
      :key="name"
      v-show="validError.$error && !validError[name]"
    >
      {{ err }}
    </p>
    <p class="wrp-field__success" v-if="successText">
      {{ successText }}
    </p>
    <a href="#" class="link" v-if="linkToScrollScan">Попробуйте зарегистрировать другой чек.</a>
  </div>
</template>

<script>

export default {
  props: [
    'label',
    'value',
    'validError',
    'validErrorText',
    'maxLength',
    'successText',
    'isDisabled',
    'linkToScrollScan'
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
