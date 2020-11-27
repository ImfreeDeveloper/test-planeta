<template>
  <div class="registartion" :class="{ disabled: loading }">
    <div class="text">
      <p>
        Для начала регистрации укажите, пожалуйста, ваш номер
        телефона.
      </p>
    </div>
    <FieldPhone
      label="Телефон*"
      :validErrorAPI="validErrorPhoneAPI"
      :validError="$v.phone"
      v-model="phone"
      @blur="validateField('phone')"
    />
    <FieldCheck
      class="mb1"
      :validError="$v.iagreePD.$error"
      validErrorText="Необходимо согласиться с правилами обработки персональных данных."
      @change="validateField('iagreePD')"
      v-model="iagreePD"
    >
      <template slot="label-descr">
        Согласен с <a :href="linkPDF" target="_blank">правилами</a> обработки
        персональных данных
      </template>
    </FieldCheck>
    <FieldCheck v-model="iagreePC">
      <template slot="label-descr">
        Согласен на получение персональной коммуникации
      </template>
    </FieldCheck>
    <button
      class="btn btn-primary mt3"
      @click="submitHandler"
      :disabled="loading"
    >
      <span class="btn-loader" v-if="loading"></span>
      Далее
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import FieldPhone from '../fieldsInput/FieldPhone.vue'
import FieldCheck from '../fieldsInput/FieldCheck.vue'
import { STEP_SMS } from '../../js/constants'
import * as authApi from '../../js/api/auth'

export default {
  components: {
    FieldPhone,
    FieldCheck
  },
  data () {
    return {
      phone: '',
      iagreePD: true,
      iagreePC: true,
      loading: false,
      validErrorPhoneAPI: {
        isError: false,
        message: '',
        phoneError: ''
      }
    }
  },
  computed: {
    ...mapGetters(['linkPDF'])
  },
  validations: {
    phone: {
      required,
      minLength: minLength(18)
    },
    iagreePD: {
      sameAs (check) {
        return check
      }
    }
  },
  watch: {
    phone (val) {
      this.validErrorPhoneAPI.isError = false
      if (val === this.validErrorPhoneAPI.phoneError) {
        this.validErrorPhoneAPI.isError = true
      }
    }
  },
  methods: {
    ...mapActions(['setStep', 'setUserData']),
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        this.validErrorPhoneAPI = {
          isError: false,
          message: ''
        }
        try {
          const data = await authApi.sendToken({ phone: this.phone })
          if (data.success) {
            setTimeout(() => {
              this.loading = false
              this.setUserData({ phone: this.phone })
              this.setStep(STEP_SMS)
            }, 600)
          } else {
            this.validErrorPhoneAPI = {
              isError: true,
              message: data.error,
              phoneError: this.phone
            }
            this.loading = false
          }
        } catch (error) {
          console.log(error)
          this.loading = false
          this.validErrorPhoneAPI = {
            isError: true,
            message: 'Ошибка сервера'
          }
        }
      }
    }
  }
}
</script>
