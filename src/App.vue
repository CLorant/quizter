<script>
import { RouterLink, RouterView } from 'vue-router'
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
    Fooldal,
    Footer
  }
}
</script>

<template><!--
<nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
</nav>-->

<Nav/>
<Fooldal/>
<Footer/>
<!--<RouterView/>-->
</template>

<style scoped>

</style>
