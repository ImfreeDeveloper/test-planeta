<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <div class="wrap-content">
        <Loader v-if="loading" />
        <registration-step-phone v-if="step === steps.STEP_PHONE" />
        <registration-step-sms v-if="step === steps.STEP_SMS" />
        <registration-step-data v-if="step === steps.STEP_DATA" />
        <registration-step-qr v-if="step === steps.STEP_QR" />
        <registration-step-last v-if="step === steps.STEP_LAST" />
        <registration-is-over v-if="step === steps.STEP_IS_OVER" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'
import RegistrationStepPhone from '../components/registrationAuth/RegistrationStepPhone.vue'
import RegistrationStepSms from '../components/registrationAuth/RegistrationStepSMS.vue'
import RegistrationStepData from '../components/registrationAuth/RegistrationStepData.vue'
import RegistrationStepQr from '../components/registrationQR/RegistrationStepQR.vue'
import RegistrationStepLast from '../components/RegistrationStepLast.vue'
import RegistrationIsOver from '../components/RegistrationIsOver.vue'

import { eventBus } from '../js/main'
import { STEP_PHONE, STEP_SMS, STEP_DATA, STEP_QR, STEP_LAST, STEP_IS_OVER } from '../js/constants'
import * as authApi from '../api/auth'
import * as LS from '../js/localStorage'

export default {
  components: {
    Header,
    Footer,
    Loader,
    RegistrationStepPhone,
    RegistrationStepSms,
    RegistrationStepData,
    RegistrationStepQr,
    RegistrationStepLast,
    RegistrationIsOver
  },
  data () {
    return {
      steps: {
        STEP_PHONE,
        STEP_SMS,
        STEP_DATA,
        STEP_QR,
        STEP_LAST,
        STEP_IS_OVER
      },
      step: '',
      loading: false
    }
  },
  async created () {
    this.loading = true
    try {
      const data = await authApi.start()
      if (data.success) {
        setTimeout(() => {
          LS.setPromo(data.results)
          this.step = LS.getStep() || STEP_PHONE
          this.loading = false
        }, 1000)
      } else {
        this.step = STEP_IS_OVER
        this.loading = false
      }
    } catch (error) {
      console.log(error)
      this.loading = false
    }
    eventBus.$on('step', step => {
      this.step = step
    })
  }
}
</script>
