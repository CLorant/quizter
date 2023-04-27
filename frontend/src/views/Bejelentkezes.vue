<template>
  <div id="tartalom" class="my-5 d-flex justify-content-center">
    <form @submit.prevent="bejelentkezes" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.svg" alt="quizter logó" decoding="async" id="logo" width="250" height="63">
      </div>
      <div class="mb-1">
        <label for="felhasznalonevInput" class="form-label">Felhasználónév</label>
        <input type="text" minlength="3" maxlength="12" pattern="[a-zA-Z0-9]+$" v-model="felhasznalonev" @click="helytelen = false" id="felhasznalonevInput" class="form-control form-control-md text-light" :class="helytelen ? 'border-danger' : 'border-dark'" placeholder="Felhasználónév" required>
          <div class="mt-1">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
            Helytelen felhasználónév
          </div>
        </div>
      </div>
      
      <div class="mb-1">
        <label for="jelszoInput" class="form-label">Jelszó</label>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" v-model="jelszo" @click="helytelen = false" id="jelszoInput" class="form-control form-control-md text-light rounded" :class="helytelen ? 'border-danger' : 'border-dark'" placeholder="Jelszó" required>
          <div class="btn text-light border-0 jelszoMegjelenit" @click="jelszoMegjelenit = !jelszoMegjelenit">
            <img v-if="jelszoMegjelenit" src="/img/ikon/szem-athuzva.svg" alt="szem áthúzva ikon" class="mb-1" decoding="async" height="20" width="20">
            <img v-else src="/img/ikon/szem.svg" alt="szem ikon" class="mb-1" decoding="async" height="20" width="20">
          </div>
        </div>
        <div class="mt-1">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
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
      jelszoMegjelenit: false,
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

#logo {
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

.jelszoMegjelenit {
  position: absolute;
  right: 0;
  z-index: 5;
}

.jelszoMegjelenit img {
  margin-top: 3px;
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