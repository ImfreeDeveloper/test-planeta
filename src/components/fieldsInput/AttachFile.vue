<template>
  <div class="attachfile">
    <p class="attachfile__title">Фото чека (.jpg, .png, не более 5 Мб)*</p>
    <div class="wrap-btn-attach"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
        <input
            id="file"
            type="file"
            name="title"
            @change="fileInputChange"
        />
        <button
          class="btn btn-dashed"
          :class="{'btn-dashed-active': activeDragEnter}"
        >
          <div class="btn__icon">
            <svg class="icon-clip">
              <use xlink:href="/images/svg/sprite.svg#icon-svg-clip"></use>
            </svg>
          </div>
          {{ fileName }}
        </button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLoader: false,
      file: null,
      activeDragEnter: false
    }
  },
  computed: {
    fileName () {
      return this.file ? limitString(this.file.name, 30) : 'Перетащите или выберите фото'
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
        alert('Превышен максимальный размер файла 5 мб!')
        obj.target.value = ''
        return false
      }

      this.file = file
    },
    onDragEnter () {
      this.activeDragEnter = true
    },
    onDragLeave () {
      this.activeDragEnter = false
    },
    onDrop () {
      this.activeDragEnter = false
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
  return !((osize > 5 * 1024 * 1024))
}

function limitString (name, limit) {
  return name.length <= limit ? name : name.substr(0, limit - 3) + '...'
}

</script>
