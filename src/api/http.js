import axios from 'axios'

let baseURL = 'https://staging2-ufa19.planeta-mall.ru/api/'

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
