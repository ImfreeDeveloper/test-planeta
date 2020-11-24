import * as authApi from '../api/auth'
import { STEP_PHONE, STEP_SMS, STEP_IS_OVER } from '../constants'
import * as LS from '../localStorage'
import Cookies from 'js-cookie'
import { getDatesPromo } from '../utils'

export default {
  state: {
    step: '',
    loading: false,
    user: {
      phone: '',
      smscode: '',
      surname: '',
      name: '',
      email: '',
      city: '',
      district: ''
    },
    promo: {}
  },
  mutations: {
    setLoading (state, loading) {
      state.loading = loading
    },
    setPromo (state, promo) {
      state.promo = promo
    },
    setStep (state, step) {
      if (step !== STEP_PHONE && step !== STEP_SMS && step !== STEP_IS_OVER) {
        const cookieAuth = Cookies.get('c_auth')
        state.step = cookieAuth ? step : STEP_PHONE
      } else {
        state.step = step
      }
      LS.setStep(state.step)
    },
    setUserData (state, data) {
      state.user = {
        ...state.user,
        ...data
      }
      LS.setUser(state.user)
    }
  },
  actions: {
    async load ({ commit }) {
      commit('setLoading', true)
      try {
        const data = await authApi.start()
        if (data.success) {
          setTimeout(() => {
            commit('setPromo', data.results)
            commit('setStep', LS.getStep() || STEP_PHONE)
            commit('setUserData', LS.getUser())
            commit('setLoading', false)
          }, 600)
        } else {
          commit('setStep', STEP_IS_OVER)
          commit('setLoading', false)
        }
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
      }
    },
    async sendToken ({ commit, state }) {
      try {
        const data = await authApi.sendToken({ phone: state.user.phone })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    setStep ({ commit }, payload) {
      commit('setStep', payload)
    },
    setUserData ({ commit }, payload) {
      commit('setUserData', payload)
    }
  },
  getters: {
    step: state => state.step,
    loading: state => state.loading,
    promo: state => state.loading,
    stores: state => JSON.parse(state.promo.stores),
    user: state => state.user,
    cities: state => JSON.parse(state.promo.cities),
    datesPromo: state => getDatesPromo(state.promo.promo_start, state.promo.promo_end),
    promoMinAmount: state => state.promo.min_amount
  }
}
