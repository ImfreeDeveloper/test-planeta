<template>
  <div class="attachfile"
    :class="{'is-danger': validError.$error}"
  >
    <p class="attachfile__title">Фото чека (.jpg, .png, не более 8 Мб)*</p>
    <button
      class="btn btn-dashed"
      @click="openLoadAttach = true"
    >
      <div class="btn__icon">
        <svg class="icon-clip">
          <use xlink:href="/images/svg/sprite.svg#icon-svg-clip"></use>
        </svg>
      </div>
      {{ fileName }}
    </button>
    <load-attach
      v-if="openLoadAttach"
      @close="openLoadAttach = false"
      @file="setFile"
    />
    <p class="error-txt" v-if="validError.$error">
      {{ validErrorText }}
    </p>
  </div>
</template>

<script>
import LoadAttach from './LoadAttach.vue'
export default {
  components: {
    LoadAttach
  },
  props: [
    'value',
    'validError',
    'validErrorText'
  ],
  data () {
    return {
      openLoadAttach: false,
      activeDragEnter: false
    }
  },
  computed: {
    fileName () {
      return this.value ? limitString(this.value.name, 30) : 'Нажмите чтобы загрузить фото'
    }
  },
  methods: {
    setFile (file) {
      this.$emit('input', file)
    }
  }
}

function limitString (name, limit) {
  return name.length <= limit ? name : name.substr(0, limit - 3) + '...'
}

</script>
