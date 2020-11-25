<template>
  <div class="wrap-content">
    <Loader v-if="loading" />
    <registration-step-phone v-if="step === steps.STEP_PHONE" />
    <registration-step-sms v-if="step === steps.STEP_SMS" />
    <registration-step-data v-if="step === steps.STEP_DATA" />
    <registration-step-qr v-if="step === steps.STEP_QR" />
    <registration-step-last v-if="step === steps.STEP_LAST" />
    <registration-is-over v-if="step === steps.STEP_IS_OVER" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '../components/Loader.vue'
import RegistrationStepPhone from '../components/registrationAuth/RegistrationStepPhone.vue'
import RegistrationStepSms from '../components/registrationAuth/RegistrationStepSMS.vue'
import RegistrationStepData from '../components/registrationAuth/RegistrationStepData.vue'
import RegistrationStepQr from '../components/registrationQR/RegistrationStepQR.vue'
import RegistrationStepLast from '../components/RegistrationStepLast.vue'
import RegistrationIsOver from '../components/RegistrationIsOver.vue'

import { STEP_PHONE, STEP_SMS, STEP_DATA, STEP_QR, STEP_LAST, STEP_IS_OVER } from '../js/constants'

export default {
  components: {
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
      }
    }
  },
  computed: {
    ...mapGetters(['step', 'loading'])
  },
  created () {
    this.$store.dispatch('load')
  }
}
</script>
