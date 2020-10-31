<template>
  <div class="wrp-field">
    <label>Магазин покупки*</label>
    <div class="wrp-input">
      <div class="wrp-input__field" @click="openSearch">
        {{ currentItem.name }}
      </div>
      <div class="wrp-field__icon" :class="{ open: open }">
        <svg class="icon-arrow">
          <use xlink:href="/images/svg/sprite.svg#icon-svg-arrow"></use>
        </svg>
      </div>
      <div class="search" v-show="open">
        <div class="search__input">
          <input type="text" placeholder="" v-model="searchItem" />
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
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
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
      searchItem: ''
    }
  },
  computed: {
    itemsFilter () {
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.searchItem.toLowerCase()) !== -1
      )
    }
  },
  methods: {
    openSearch () {
      this.open = true
    },
    setCurrentItem (item) {
      this.currentItem = item
      this.open = false
      this.searchItem = ''
    }
  }
}
</script>
