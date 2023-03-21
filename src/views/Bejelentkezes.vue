<script>
import axios from 'axios';
import { useFelhasznaloStore } from '../stores/felhasznalo'

const felhasznaloNevRegex = /^[a-zA-Z0-9]+$/;

export default {
  data() {
    return {
      felhasznaloNev: '',
      jelszo: '',
      helytelenFelhasznaloNev: false,
      helytelenJelszo: false
    };
  },
  methods: {
    async login() {
      try {
        if(!felhasznaloNevRegex.test(this.felhasznaloNev)) {
          this.helytelenFelhasznaloNev = true;
          this.hibas = true;
        }

        if (this.jelszo.length < 8) {
          this.helytelenJelszo = true;
          this.hibas = true;
        }

        if(!this.hibas) {
          const response = await axios.post(`/api/getUser/${this.felhasznaloNev}`, {
            felhasznaloNev: this.felhasznaloNev,
            jelszo: this.jelszo
          })
          .then(() => {
            const felhasznalo = response.json();
            console.log(felhasznalo)
            useFelhasznaloStore().$patch(felhasznalo);
            this.$router.push("/");
          })
          .catch(this.helytelenAdatok = true);

          if (response.status === 200) {
            
          }
        }
      } catch {
        this.helytelenAdatok = true;
        
      }
    }
  }
}
</script>

<template>
  <div id="tartalom" class="my-5 d-flex flex-column justify-content-center align-items-center">
    <form @submit.prevent="login" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.webp" alt="Logo" decoding="async" class="w-75">
      </div>

      <div class="mb-1">
        <label for="felhasznaloNevInput" class="form-label">Felhasználónév</label>
        <input type="text" minlength="3" maxlength="12" id="felhasznaloNevInput" class="form-control form-control-md text-light" :class="helytelenFelhasznaloNev ? 'border-danger' : 'border-dark'" v-model="felhasznaloNev"
          @click="helytelenFelhasznaloNev = false" required>
          <div class="mt-1" style="height: 24px">
          <div class="text-danger" :class="helytelenFelhasznaloNev ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Helytelen felhasználónév
          </div>
        </div>
      </div>

      <div class="mb-1">
        <!-- Jelszó visszaállítás WIP
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <a href="#" class="link">Elfelejtett jelszó?</a>
        </div>
        -->
        <label for="jelszoInput" class="form-label">Jelszó</label>
        <input type="password" minlength="8" id="jelszoInput" class="form-control form-control-md text-light" :class="helytelenJelszo ? 'border-danger' : 'border-dark'"
        v-model="jelszo" @click="helytelenJelszo = false" required>
        <div class="mt-2" style="height: 24px">
          <div class="text-danger" :class="helytelenJelszo ? 'd-block' : 'd-none'">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond mb-1" viewBox="0 0 16 16">
            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
            Helytelen jelszó
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-md btn-warning w-100 mt-2">Bejelentkezés</button>
      <div class="d-flex justify-content-center mt-4">
        <p>Új a Quizteren? <RouterLink to="/regisztracio" class="link">Regisztráció</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
#tartalom {
  height: 700px;
}

#form {
  max-width: 350px;
  width: 95%;
}

label, p {
  color: rgb(220, 220, 220)
}

input,
input:focus {
  background-color: #0D1117;
}

.link {
  color: rgb(255, 200, 0);
  text-decoration: none;
}

.link:hover {
  opacity: 0.8;
}
</style>