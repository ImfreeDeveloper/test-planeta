<template>
  <div class="scan-qr scan-qr-hidden">
    <qrcode-stream
      :camera="camera"
      @init="onInit"
    />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  components: {
    QrcodeStream
  },
  props: ['value'],
  data () {
    return {
      camera: 'auto'
    }
  },

  methods: {
    async onInit (promise) {
      try {
        await promise
        this.$emit('input', 'available')
      } catch (error) {
        this.$emit('input', 'notAvailable')
      }
    }
  }
}

</script>
