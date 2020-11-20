// let obj = {
//   userData: {
//     phone: '',
//     code: '',
//     step: ''
//   },
//   promo: data.results
// }
export function setPromo (promo) {
  const ls = getStorage()
  ls.promo = promo
  setStorage(ls)
}

export function setStep (step) {
  const ls = getStorage()
  if (ls.hasOwnProperty('userData')) {
    ls.userData.step = step
  } else {
    ls.userData = { step }
  }
  setStorage(ls)
}

export function getStep () {
  const ls = getStorage()
  if (ls.hasOwnProperty('userData')) {
    return ls.userData.step || null
  }
  return null
}

export function setPhone (phone) {
  const ls = getStorage()
  if (ls.hasOwnProperty('userData')) {
    ls.userData.phone = phone
  } else {
    ls.userData = { phone }
  }
  setStorage(ls)
}

export function getPhone () {
  const ls = getStorage()
  if (ls.hasOwnProperty('userData')) {
    return ls.userData.phone || null
  }
  return null
}

export function getCities () {
  const ls = getStorage()
  if (ls.hasOwnProperty('promo')) {
    return JSON.parse(ls.promo.cities) || null
  }
  return null
}

function getStorage () {
  return JSON.parse(localStorage.getItem('planeta-promo')) || {}
}
function setStorage (store) {
  return localStorage.setItem('planeta-promo', JSON.stringify(store))
}
