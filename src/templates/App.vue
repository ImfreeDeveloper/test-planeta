<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <div class="wrap-content">
        <registration-step-phone v-if="step === steps.STEP_PHONE" />
        <registration-step-sms v-if="step === steps.STEP_SMS" />
        <registration-step-data v-if="step === steps.STEP_DATA" />
        <registration-step-qr v-if="step === steps.STEP_QR" />
        <registration-step-last v-if="step === steps.STEP_LAST" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import RegistrationStepPhone from '../components/registrationAuth/RegistrationStepPhone.vue'
import RegistrationStepSms from '../components/registrationAuth/RegistrationStepSMS.vue'
import RegistrationStepData from '../components/registrationAuth/RegistrationStepData.vue'
import RegistrationStepQr from '../components/registrationQR/RegistrationStepQR.vue'
import RegistrationStepLast from '../components/RegistrationStepLast.vue'

import { eventBus } from '../js/main'
import { STEP_PHONE, STEP_SMS, STEP_DATA, STEP_QR, STEP_LAST } from '../js/constants'
import * as authApi from '../api/auth'

export default {
  components: {
    Header,
    Footer,
    RegistrationStepPhone,
    RegistrationStepSms,
    RegistrationStepData,
    RegistrationStepQr,
    RegistrationStepLast
  },
  data () {
    return {
      steps: {
        STEP_PHONE,
        STEP_SMS,
        STEP_DATA,
        STEP_QR,
        STEP_LAST
      },
      step: STEP_PHONE
    }
  },
  async created () {
    try {
      const data = await authApi.start()
      setTimeout(() => {
        console.log(data)
        // eventBus.$emit('step', STEP_SMS)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
    eventBus.$on('step', step => {
      this.step = step
    })

  }
}
</script>
