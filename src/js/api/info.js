import http from './http'

export async function getStore (params) {
  let { data } = await http.post('promo/store', params)
  return data
}
