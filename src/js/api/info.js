import http from './http'

export async function getStore (params) {
  let { data } = await http.post('promo/store', params)
  return data
}

export async function send (params) {
  let { data } = await http.post('/promo/send', params)
  return data
}
