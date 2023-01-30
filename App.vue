<script>
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import Fooldal from './components/fooldal/Fooldal.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
    Nav,
    Footer
  }
}
</script>

<template>
<Nav/>
<RouterView></RouterView>
<Footer/>
</template>

<style scoped>
</style>