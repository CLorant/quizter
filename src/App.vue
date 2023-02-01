<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import Fooldal from './views/Fooldal.vue'

export default {
  data() {
    return {
      
    }
  },
  components: {
    Nav,
    Fooldal,
    Footer
  }
}
</script>

<template>
<Nav/>
<RouterView/>
<Footer/>
</template>

<style scoped>

</style>