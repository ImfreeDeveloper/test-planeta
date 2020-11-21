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
            <input
                id="file"
                type="file"
                name="title"
                @change="fileInputChange"
            />
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
export default {
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

      this.$emit('file', file)
      this.$emit('close')
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
