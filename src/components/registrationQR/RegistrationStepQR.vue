<template>
  <div class="registartion">
    <h1 class="title">Авто за 3000 <i class="rub"></i></h1>
    <h2 class="subtitle">Регистрация чека</h2>
    <Scan-qr-for-available v-model="availableCamera" v-if="availableCamera === null" />
    <registration-not-camera v-if="availableCamera === 'notAvailable'"/>
    <registration-is-camera v-if="availableCamera === 'available'"/>
  </div>
</template>

<script>
import ScanQrForAvailable from '../scanQR/ScanQrForAvailable.vue'
import RegistrationIsCamera from './RegistrationIsCamera.vue'
import RegistrationNotCamera from './RegistrationNotCamera.vue'

export default {
  components: {
    ScanQrForAvailable,
    RegistrationIsCamera,
    RegistrationNotCamera
  },
  data () {
    return {
      availableCamera: null
    }
  },
  watch: {
    availableCamera (val) {
      this.$store.commit('setLoading', false)
    }
  },
  mounted () {
    this.$store.commit('setLoading', true)
    console.log(window.ga.getAll()[0].get('clientId'))
  }
}
</script>
