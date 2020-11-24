<template>
  <div
    class="attachfile"
    :class="{'is-danger': validError ? validError.$error : false}"
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
    <load-attach-scan-qr
      v-if="openLoadAttach"
      @close="openLoadAttach = false"
      @fileScan="setParams"
    />
    <p class="error-txt" v-if="validError ? validError.$error : false">
      {{ validErrorText }}
    </p>
  </div>
</template>

<script>
import loadAttachScanQr from '../attachFile/LoadAttachScanQr.vue'

export default {
  components: {
    loadAttachScanQr
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
      return this.value ? limitString(this.value.file.name, 30) : 'Нажмите чтобы загрузить фото'
    }
  },
  methods: {
    setParams (params) {
      this.$emit('input', params)
    }
  }
}

function limitString (name, limit) {
  return name.length <= limit ? name : name.substr(0, limit - 3) + '...'
}
</script>
