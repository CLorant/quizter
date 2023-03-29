<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  import { mapWritableState } from 'pinia';
  import { useFelhasznaloStore } from './stores/felhasznalo';
  import felhasznaloJSON from './felhasznalo.json'; // átmeneti
  import axios from 'axios';

  export default {
    components: {
      Nav,
      Footer
    },

    computed: {
      ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
    },

    created() {
      this.getUserByName();
      // this.getUserByName();
      /*
      const res = felhasznaloJSON // átmeneti
      for (const prop in this.felhasznalo) { 
        if (res.hasOwnProperty(prop)) {
          this.felhasznalo[prop] = res[prop];
        }
      }
      this.felhasznalo.bejelentkezett = true // átmeneti
      this.felhasznalo.jogosultsag = "admin" // átmeneti
      */
    },

    methods: {
      async getUserByName() {
        // automatikus bejelentkezést ide majd valahogy
         await axios.get(`${import.meta.env.VITE_API_URL}/getUserByName/${'asd'}`)
          .then(response => {
            for (const prop in this.felhasznalo) { 
              if (response.data.hasOwnProperty(prop)) {
                this.felhasznalo[prop] = response.data[prop];
              }
            }
            this.felhasznalo.bejelentkezett = true
            })
          .catch(error => {
            console.log(error);
          });
      }
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
    color: whitesmoke;
    min-height: 100vh;
  }
</style>