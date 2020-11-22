<template>
  <div class="modal-popup" @click="$emit('close')">
    <div class="modal-popup-wrapper" @click.stop>
      <div class="modal-popup-top">
        <div class="container">
          <p>Рекомендации по загрузке фото чека</p>
        </div>
        <span class="modal-popup-close" @click="$emit('close')"></span>
      </div>
      <div class="modal-popup-body">
        <div class="container">
          <ol class="list-number">
            <li>На фотографии должен быть кассовый чек</li>
            <li>На фотографии должен помещаться чек целиком</li>
            <li>На чеке должен присутствовать QR-код</li>
            <li>Фокусировка фото должна быть на QR-коде</li>
            <li>На фото должны быть отчётливо видны дата покупки, сумма и наименование магазина</li>
          </ol>
          <div class="example-check">
            <p>Пример корректного чека</p>
            <img src="/images/check-qrexample.png" alt="Пример чека"  />
          </div>
        </div>
      </div>
      <div class="modal-popup-bottom">
        <div class="container">
          <div class="wrap-btn-attach">
            <qrcode-capture :multiple="false" @decode="onDecode" />
            <button class="btn btn-primary">
              Загрузить чек
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeCapture } from 'vue-qrcode-reader'
import { parseQrString } from '../../js/utils'
export default {
  components: {
    QrcodeCapture
  },
  methods: {
    onDecode (result) {
      let params = ''
      try {
        params = parseQrString(result)
      } catch (error) {
        params = {}
      }
      this.$emit('file', params)
      this.$emit('close')
    }
  }
}

</script>
