// scss
import './../scss/main.scss'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

import App from '../templates/App.vue'

Vue.use(Vuelidate)
Vue.use(VueTheMask)

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
