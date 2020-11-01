<template>
  <div class="scan-qr-wrap">
    <div class="scan-qr">
      <div class="scan-qr__angles-left"></div>
      <div class="scan-qr__angles-right"></div>
      <div
        class="scan-qr__start"
        v-if="false"
        @click="camera = 'auto'"
      >
        <div class="scan-qr__start-img">
          <svg class="icon-camera">
            <use xlink:href="/images/svg/sprite.svg#icon-svg-camera"></use>
          </svg>
        </div>
        <p class="scan-qr__start-text">Нажмите для сканирования QR-кода</p>
      </div>
      <!-- <div class="scan-qr__refresh">
        <p>Не удалось считать QR-код</p>
        <div class="scan-qr__refresh-img">
          <img src="/images/svg/icon-reload.svg" alt="refresh" />
        </div>
        <p>Повторить</p>
      </div> -->
      <div class="scan-qr__code" v-if="!destroyed">
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        >
          <div class="loading-indicator" v-if="loading">
            Loading...
          </div>
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
      decodedContent: '',
      errorMessage: '',
      camera: 'auto',
      loading: false,
      destroyed: false
    }
  },

  methods: {
    onDecode (content) {
      // const params = content.split('&')
      try {
        const params = 't=20170609T114200&s=3000.00&fn=9999078900002273&i=43&fp=159733624&n=1'.split('&&')

        let t = params[0].split('t=')[1]
        let s = params[1].split('s=')[1]

        console.log(t + ' - ' + s)
        console.log(getDate(t))
      } catch (error) {
        console.log(error)
      }

      this.camera = 'off'
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
