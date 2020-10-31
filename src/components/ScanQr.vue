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
      <div class="scan-qr__code">
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        />
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
      camera: 'auto'
    }
  },

  methods: {
    onDecode (content) {
      // const params = content.split('&')
      const params = 't=20170609T114200&s=3000.00&fn=9999078900002273&i=43&fp=159733624&n=1'.split('&')
      if (params.length) {
        let t = params[0].split('t=')[1]
        let s = params[1].split('s=')[1]

        console.log(t + ' - ' + s)
        console.log(getDate(t))
      }
      this.camera = 'off'
    },
    onInit (promise) {
      promise
        .then(() => {
          console.log('Successfully initilized! Ready for scanning now!')
        })
        .catch((error) => {
          if (error.name === 'NotAllowedError') {
            this.errorMessage = 'Hey! I need access to your camera'
          } else if (error.name === 'NotFoundError') {
            this.errorMessage = 'Do you even have a camera on your device?'
          } else if (error.name === 'NotSupportedError') {
            this.errorMessage =
              'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
          } else if (error.name === 'NotReadableError') {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
          } else {
            this.errorMessage = 'UNKNOWN ERROR: ' + error.message
          }
        })
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
