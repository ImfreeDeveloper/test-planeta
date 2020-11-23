<template>
  <div class="repeat-send">
    <p v-if="currentTime !== 0">Повторная отправка кода через {{ formatCurrentTime }} </p>
    <a v-else href="#" class="link" @click.prevent="sendCodeRepeat">Отправить код ещё раз</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const timeInSeconds = 59

export default {
  data () {
    return {
      currentTime: timeInSeconds,
      timer: null
    }
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {
    this.stopTimer()
  },
  computed: {
    formatCurrentTime () {
      const seconds = (this.currentTime < 10 ? '0' : '') + this.currentTime
      return `0:${seconds}`
    }
  },
  methods: {
    ...mapActions(['sendToken']),
    startTimer () {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    async sendCodeRepeat () {
      this.currentTime = timeInSeconds
      this.startTimer()
      this.sendToken()
    }
  },
  watch: {
    currentTime (time) {
      if (time === 0) {
        this.stopTimer()
      }
    }
  }

}
</script>
