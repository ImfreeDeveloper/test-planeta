<template>
  <div class="scan-qr-wrap">
    <div class="scan-qr">
      <div class="scan-qr__angles-left"></div>
      <div class="scan-qr__angles-right"></div>
      <div
        class="scan-qr__start"
        v-if="isStart"
        @click="startScan"
      >
        <div class="scan-qr__start-img">
          <svg class="icon-camera">
            <use xlink:href="/images/svg/sprite.svg#icon-svg-camera"></use>
          </svg>
        </div>
        <p class="scan-qr__start-text">Нажмите для сканирования QR-кода</p>
      </div>
      <div class="scan-qr__refresh"
        @click="reload"
        v-if="isError"
      >
        <p>Не удалось считать QR-код</p>
        <div class="scan-qr__refresh-img">
          <img src="/images/svg/icon-reload.svg" alt="refresh" />
        </div>
        <p>Повторить</p>
      </div>
      <div class="scan-qr__code"
        v-if="!destroyed && !isStart && !isError"
        @click="reload"
      >
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        >
          <span class="loading-indicator" v-if="loading"></span>
        </qrcode-stream>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { parseQrString } from '../../js/utils'
import Timer from '../../mixins/Timer.vue'
const timeInSeconds = 31

export default {
  components: {
    QrcodeStream
  },
  data () {
    return {
      camera: 'off',
      loading: false,
      destroyed: false,
      isStart: true,
      isError: false,
      currentTime: timeInSeconds
    }
  },
  mixins: [Timer],
  methods: {
    startScan () {
      this.isStart = false
      this.camera = 'auto'
      this.startTimer()
    },
    onDecode (content) {
      try {
        const params = parseQrString(content)
        params.isError = false

        this.$emit('handlerScan', params)
      } catch (error) {
        this.isError = true
        this.$emit('handlerScan', { isError: true })
      } finally {
        this.camera = 'off'
        this.stopTimer()
      }
    },
    async onInit (promise) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async reload () {
      this.destroyed = true
      this.stopTimer()

      await this.$nextTick()

      this.currentTime = timeInSeconds
      this.startTimer()
      this.destroyed = false
      this.isError = false
      this.$emit('handlerScan', { isError: false })
      this.camera = 'auto'
    }
  },
  watch: {
    currentTime (time) {
      if (time <= 0) {
        this.stopTimer()
        this.isError = true
        this.$emit('handlerScan', { isError: true })
        this.camera = 'off'
      }
    }
  }
}

</script>
