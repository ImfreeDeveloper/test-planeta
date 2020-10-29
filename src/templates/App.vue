<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <Registration />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Registration from '../components/Registration.vue'
export default {
  components: {
    Header,
    Footer,
    Registration
  }
}
</script>
