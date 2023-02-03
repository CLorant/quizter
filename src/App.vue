<script>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default {
  felhasznalo: "luke",
  tema: "",
  temaNev: "",
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
<RouterView/>
<Footer/>
</template>

<style scoped>
#tartalom{
  min-height: calc(100vh - 300px);
}
</style>