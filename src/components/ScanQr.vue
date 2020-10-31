<template>
  <div class="scan-qr-wrap">
    <div class="scan-qr">
      <div class="scan-qr__angles-left"></div>
      <div class="scan-qr__angles-right"></div>
      <div
        class="scan-qr__start"
        v-if="camera === 'off'"
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
      <div class="scan-qr__code" v-if="camera !== 'off'">
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @detect="onDetect"
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
      camera: 'off'
    }
  },

  methods: {
    onDecode (content) {
      console.log(content)
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
    },
    async onDetect (promise) {
      try {
        const {
          imageData, // raw image data of image/frame
          content, // decoded String
          location // QR code coordinates
        } = await promise
        console.log(imageData)
        console.log(content)
        console.log(location)
        // ...
      } catch (error) {
        // ...
      }
    }
  }
}
</script>
