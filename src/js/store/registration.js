import * as authApi from '../api/auth'
import { STEP_PHONE, STEP_IS_OVER } from '../constants'
import * as LS from '../localStorage'

export default {
  state: {
    step: '',
    loading: false,
    user: {
      phone: '',
      smscode: '',
      surname: '',
      name: '',
      email: ''
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
      state.step = step
      LS.setStep(step)
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
          }, 1000)
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
    user: state => state.user,
    cities: state => JSON.parse(state.promo.cities)
  }
}
