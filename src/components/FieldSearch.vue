<template>
  <div class="wrp-field" :class="{ 'is-danger': validError }">
    <label>{{ label }}</label>
    <div class="wrp-input" :ref="'wrap_search_' + _uid">
      <div class="wrp-input__field" @click="openSearch">
        {{ value.name }}
      </div>
      <div class="wrp-field__icon" :class="{ open: open }">
        <svg class="icon-arrow">
          <use xlink:href="/images/svg/sprite.svg#icon-svg-arrow"></use>
        </svg>
      </div>
      <div class="search" v-show="open">
        <div class="search__input">
          <input
            type="text"
            placeholder=""
            :value="searchItem"
            @input="updateSearch($event.target.value)"
            :ref="'search_' + _uid"
          />
          <div class="search__icon">
            <svg class="icon-search">
              <use xlink:href="/images/svg/sprite.svg#icon-svg-search"></use>
            </svg>
          </div>
        </div>
        <div class="search__items" v-show="itemsFilter.length">
          <div
            class="search__item"
            v-for="item in itemsFilter"
            :key="item.id"
            @click="setCurrentItem(item)"
            @keyup.enter="setCurrentItem(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <p class="wrp-field__error" v-if="validError">
      {{ validErrorText }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          id: 0,
          name: 'Adidas'
        },
        {
          id: 1,
          name: 'Adidas origin'
        },
        {
          id: 2,
          name: 'Oysx'
        },
        {
          id: 3,
          name: 'Bershka'
        },
        {
          id: 4,
          name: 'Pull & Bear'
        },
        {
          id: 5,
          name: 'Zara'
        }
      ],
      open: false,
      currentItem: {},
      searchItem: '',
      itemsFilter: []
    }
  },
  props: ['label', 'value', 'validError', 'validErrorText'],
  methods: {
    openSearch () {
      this.open = true
      this.$nextTick(() => {
        this.$refs['search_' + this._uid].focus()
      })
      this.itemsFilter = this.items.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.searchItem.toLowerCase()) > -1
      )
    },
    setCurrentItem (item) {
      this.currentItem = item
      this.open = false
      this.searchItem = ''
      this.$emit('input', this.currentItem)
    },
    updateSearch (value) {
      this.searchItem = value
      this.openSearch()
    },
    handleOutsideClick (e) {
      const path = e.path || (e.composedPath && e.composedPath())
      if (!path.includes(this.$refs['wrap_search_' + this._uid])) {
        this.open = false
        this.searchItem = ''
      }
    }
  },
  watch: {
    open (val) {
      if (val) {
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    }
  }
}
</script>
