<template>
  <div class="repeat-send">
    <p v-if="currentTime !== 0">Повторная отправка кода через {{ formatCurrentTime }} </p>
    <a v-else href="#" class="link" @click.prevent="sendCodeRepeat">Отправить код ещё раз</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Timer from '../mixins/Timer.vue'
const timeInSeconds = 59

export default {
  data () {
    return {
      currentTime: timeInSeconds
    }
  },
  mixins: [Timer],
  computed: {
    formatCurrentTime () {
      const seconds = (this.currentTime < 10 ? '0' : '') + this.currentTime
      return `0:${seconds}`
    }
  },
  methods: {
    ...mapActions(['sendToken']),
    async sendCodeRepeat () {
      this.currentTime = timeInSeconds
      this.startTimer()
      this.sendToken()
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>
