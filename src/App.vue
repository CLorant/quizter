<script>
  import Nav from './components/Nav.vue'
  import Footer from './components/Footer.vue'

  export default {
    components: {
      Nav,
      Footer
    }
  }
</script>

<template>
  <Nav/>
  <div id="tarolo">
    <RouterView/>
  </div>
  <Footer/>
</template>

<style scoped>
  #tarolo{
    color: white;
    min-height: 100vh;
  }
</style>