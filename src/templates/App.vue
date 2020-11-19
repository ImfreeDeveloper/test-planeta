<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <div class="wrap-content">
        <registration-step1 v-if="step === steps.STEP_PHONE" />
        <registration-step2 v-if="step === steps.STEP_SMS" />
        <registration-step3 v-if="step === steps.STEP_DATA" />
        <registration-step4 v-if="step === steps.STEP_QR" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// import Registration from '../components/Registration.vue'
import RegistrationStep1 from '../components/RegistrationPhone/RegistrationStep1.vue'
import RegistrationStep2 from '../components/RegistrationPhone/RegistrationStep2.vue'
import RegistrationStep3 from '../components/RegistrationPhone/RegistrationStep3.vue'
import RegistrationStep4 from '../components/RegistrationQR.vue'
import { eventBus } from '../js/main'
import { STEP_PHONE, STEP_SMS, STEP_DATA, STEP_QR } from '../js/constants'

export default {
  components: {
    Header,
    Footer,
    RegistrationStep1,
    RegistrationStep2,
    RegistrationStep3,
    RegistrationStep4
    // Registration
  },
  data () {
    return {
      steps: {
        STEP_PHONE,
        STEP_SMS,
        STEP_DATA,
        STEP_QR
      },
      step: STEP_PHONE
    }
  },
  created () {
    eventBus.$on('step', step => {
      this.step = step
    })
  }
}
</script>
