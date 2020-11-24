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
        @focus="setStartInput"
        v-mask="'+7(###)###-##-##'"
      />
      <slot name="icon"></slot>
    </div>
    <p class="wrp-field__error" v-if="validError.$error && !validError.required">
      Поле «Телефон» не заполнено
    </p>
    <p class="wrp-field__error" v-if="validError.$error && !validError.minLength">
      Некорректный формат телефона
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
  methods: {
    setStartInput () {
      if (!this.value.length) {
        this.$emit('input', ' (')
      }
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
