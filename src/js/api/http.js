import axios from 'axios'

window.IS_DEBUG = window.location.href.indexOf('localhost:') !== -1

// let baseURL = window.IS_DEBUG ? 'https://staging2-ufa19.planeta-mall.ru/api/' : '/api/'
let baseURL = 'https://staging2-ufa19.planeta-mall.ru/api/'

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
