<template>
  <div class="attachfile">
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
      @file="setFile"
    />
  </div>
</template>

<script>
import loadAttachScanQr from '../attachFile/LoadAttachScanQr.vue'

export default {
  components: {
    loadAttachScanQr
  },
  props: ['value'],
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
  return 'Чек загружен...'
  // return name.length <= limit ? name : name.substr(0, limit - 3) + '...'
}
</script>
