<template>
  <div
    class="wrp-field"
    :class="{'is-danger': validError.$error}"
  >
    <label>{{ label }}</label>
    <div class="wrp-input">
      <input
        type="text"
        placeholder=""
        :value="value"
        v-on="inputListeners"
        :maxlength="maxLength ? maxLength : null"
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
    <!-- <p class="wrp-field__error" v-if="validError.$error && !validError[]">
      Поле «Телефон» не заполнено
    </p>
    <p class="wrp-field__error" v-if="validError.$error && !validError[]">
      Некорректный формат телефона
    </p> -->
  </div>
</template>

<script>

export default {
  props: [
    'label',
    'value',
    'validError',
    'validErrorText',
    'maxLength'
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
