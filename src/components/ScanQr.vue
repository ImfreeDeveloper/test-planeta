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
          <span class="loading-indicator" v-if="loading">
            Загрузка...
          </span>
        </qrcode-stream>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
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
      isError: false
    }
  },

  methods: {
    startScan () {
      this.isStart = false
      this.camera = 'auto'
    },
    onDecode (content) {
      try {
        const params = content.split('&')

        const date = getDate(params[0].split('t=')[1])
        const summa = params[1].split('s=')[1]

        this.$emit('handlerScan', {
          date,
          summa,
          isError: false
        })
      } catch (error) {
        this.isError = true
        this.$emit('handlerScan', { isError: true })
      } finally {
        this.camera = 'off'
      }
    },
    async onInit (promise) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async reload () {
      this.destroyed = true

      await this.$nextTick()

      this.destroyed = false
      this.isError = false
      this.$emit('handlerScan', { isError: false })
      this.camera = 'auto'
    }
  }
}

function getDate (dateTimeFormat) {
  let dateAsString = dateTimeFormat.split('')
  let year = dateAsString.splice(0, 4).join('')
  let month = dateAsString.splice(0, 2).join('')
  let day = dateAsString.splice(0, 2).join('')
  // let hours = dateAsString.splice(1, 2).join('')
  // let minutes = dateAsString.splice(1, 2).join('')
  // let seconds = dateAsString.splice(1, 2).join('')
  let date = day + '.' + month + '.' + year
  return date
}

</script>
