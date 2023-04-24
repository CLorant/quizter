<template>
  <Nav />
  <div id="tarolo">
    <RouterView />
  </div>
  <Footer />
</template>

<script>
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import { mapWritableState } from 'pinia';
import { useFelhasznaloStore } from './stores/felhasznalo';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  components: {
    Nav,
    Footer
  },

  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  },
  
  created() {
    if (Cookies.get('auth_token')) {
      this.tokenLogin();
    }
  },

  methods: {
    // az automatikus bejelentkezés süti alapján
    async tokenLogin() {
      await axios.get(`${import.meta.env.VITE_API_URL}/tokenlogin`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
        .then(response => {
          if(response.data === "Unauthorized") {
            this.$router.push("/bejelentkezes");
          }
          else {
            for (const prop in this.felhasznalo) {
              if (response.data.hasOwnProperty(prop)) {
                this.felhasznalo[prop] = response.data[prop];
              }
            }
            this.felhasznalo.bejelentkezett = true;
          }
        })
        .catch(error => {
          console.log('Hiba:', error.message);
        })
    }
  }
}
</script>

<style scoped>
#tarolo {
  color: rgb(230, 230, 230);
  min-height: 100vh;
}
</style>