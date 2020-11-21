import { NAME_KEY_LS } from './constants'

export function setStep (step) {
  const ls = getStorage()
  ls.step = step
  setStorage(ls)
}

export function getStep () {
  const ls = getStorage()
  return ls.step || null
}

export function setUser (user) {
  const ls = getStorage()
  ls.user = user
  setStorage(ls)
}

export function getUser () {
  const ls = getStorage()
  return ls.user || {}
}

function getStorage () {
  return JSON.parse(localStorage.getItem(NAME_KEY_LS)) || {}
}
function setStorage (store) {
  return localStorage.setItem(NAME_KEY_LS, JSON.stringify(store))
}
