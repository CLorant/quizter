<template>
  <div id="tartalom" class="my-5 d-flex justify-content-center">
    <form @submit.prevent="bejelentkezes" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo_kicsi.webp" alt="Logo" decoding="async" width="250" height="63">
      </div>
      <div class="mb-1">
        <label for="felhasznalonevInput" class="form-label">Felhasználónév</label>
        <input type="text" minlength="3" maxlength="12" pattern="[a-zA-Z0-9]+$" v-model="felhasznalonev" @click="helytelen = false" id="felhasznalonevInput" class="form-control form-control-md text-light" :class="helytelen ? 'border-danger' : 'border-dark'" placeholder="Felhasználónév" required>
          <div class="mt-1">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Helytelen felhasználónév
          </div>
        </div>
      </div>

      <div class="mb-1">
        <!-- Jelszó visszaállítás
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <a href="#" class="link">Elfelejtett jelszó?</a>
        </div>
        -->
        <label for="jelszoInput" class="form-label">Jelszó</label>
        <input type="password" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="jelszo" @click="helytelen = false" id="jelszoInput" class="form-control form-control-md text-light" :class="helytelen ? 'border-danger' : 'border-dark'" placeholder="Jelszó" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Helytelen jelszó
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-md btn-warning w-100 mt-2 fw-bold text-dark">Bejelentkezés</button>
      <div class="d-flex justify-content-center mt-4 navigal">
        <p>Új a Quizteren? <RouterLink to="/regisztracio" class="link fw-bold">Regisztráció</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useFelhasznaloStore } from '../stores/felhasznalo'
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      felhasznalonev: '',
      jelszo: '',
      helytelen: false
    };
  },
  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  },
  methods: {
    async bejelentkezes() {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: this.felhasznalonev,
        password: this.jelszo
      },{withCredentials: true})
        .then(response => {
          if(response.data === "Hitelesítsd az emailed bejelentkezés előtt!") {
            alert(response.data);
            this.helytelen = true;
          }
          else if(response.data === "Unauthorized") {
            this.helytelen = true;
          }
          else {
            for (const prop in this.felhasznalo) {
              if (response.data.hasOwnProperty(prop)) {
                this.felhasznalo[prop] = response.data[prop];
              }
            }
            if(Cookies.get('auth_token')) {
              Cookies.remover('auth_token');
            }
            Cookies.set('auth_token', `${response.data.auth_token}`, { path: '/', sameSite: 'Lax', secure: true })
            this.felhasznalo.bejelentkezett = true;
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.helytelen = true;
          console.log('Hiba:', error.message);
        });
    }
  }
}
</script>

<style scoped>
#tartalom {
  padding-top: 40px;
}

#form {
  max-width: 350px;
  width: 95%;
}

img {
  width: 75%;
  height: 100%;
}

label, p {
  color: rgb(220, 220, 220)
}

input, input:focus {
  background-color: #0D1117;
}

.mt-1 {
  height: 24px
}

.navigal {
  font-size: 10pt;
}

.link {
  color: rgb(255, 200, 0);
  text-decoration: none;
}

.link:hover {
  opacity: 0.8;
}

.form-control::-webkit-input-placeholder {
  color: gray;
}

.form-control::-moz-placeholder {
  color: gray;
}

.form-control:-moz-placeholder {
  color: gray;
}

.form-control:-ms-placeholder {
  color: gray;
}

.form-control::placeholder {
  color: gray;
}

#form, input, button {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>