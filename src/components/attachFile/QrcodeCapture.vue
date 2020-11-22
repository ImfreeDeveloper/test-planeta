<template lang="html">
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple
  />
</template>

<script>
import { scan } from 'vue-qrcode-reader/src/misc/scanner.js'
// import 'vue-qrcode-reader/dist/VueQrcodeReader.common.js'
import { imageDataFromFile } from 'vue-qrcode-reader/src/misc/image-data.js'
import CommonAPI from 'vue-qrcode-reader/src/mixins/CommonAPI.vue'
import Worker from '../../js/worker'

export default {
  name: 'qrcode-capture',

  mixins: [CommonAPI],

  props: {
    worker: {
      type: Function,
      default: Worker
    }
  },

  methods: {
    fileInputChange (obj) {
      let file = obj.target.files[0]
      if (!file) return false

      if (!validEXT(file)) {
        alert('Данный тип файла не поддерживается системой. Пожалуйста, выберите другой файл (jpg, png).')
        obj.target.value = ''
        this.showLoader = false
        return false
      }

      if (!validSize(file)) {
        alert('Превышен максимальный размер файла 8 мб!')
        obj.target.value = ''
        return false
      }

      return true
    },
    onChangeInput (event) {
      if (!this.fileInputChange(event)) return
      const files = [...event.target.files]
      const resultPromises = files.map(this.processFile)

      resultPromises.forEach(this.onDetect)
    },

    async processFile (file) {
      const imageData = await imageDataFromFile(file)
      const scanResult = await scan(this.worker, imageData)

      return scanResult
    }
  }
}
// Проверка расширения файлов при добавлении
function validEXT (file) {
  let ext = file.name.split('.')[1]
  if (!ext) return false
  let mas = ['jpg', 'png']
  for (let i = 0; i < mas.length; i++) {
    if (mas[i] === ext) return true
  }
  return false
}

// Проверка размера добавляемого файла
function validSize (obj) {
  var osize = obj.size
  return !((osize > 8 * 1024 * 1024))
}
</script>
