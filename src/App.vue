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
  <RouterView/>
  <Footer/>
</template>

<style scoped>
  #tartalom{
    color: white;
    min-height: calc(100vh - 300px);
  }
</style>