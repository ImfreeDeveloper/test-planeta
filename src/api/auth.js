import http from './http'

export async function sendToken (params) {
  let { data } = await http.post('promo/sms/send-token', params)
  return data
}

export async function start () {
  let { data } = await http.get('promo')
  return data
}
