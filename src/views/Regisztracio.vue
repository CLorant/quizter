<template>
  <div id="tartalom" class="my-5 d-flex flex-column justify-content-center align-items-center">
    <form @submit.prevent="regisztralas" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo_kicsi.webp" alt="Logo" decoding="async" width="250" height="63">
      </div>
      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="felhasznalonevInput" class="form-label">Felhasználónév</label>
          <label for="felhasznalonevInput" class="sarga mt-1">Betű vagy szám</label>
        </div>
        <input type="text" minlength="3" maxlength="12" pattern="[a-zA-Z0-9]+$" v-model="felhasznalonev" @click="helytelenFelhasznalonev = false" id="felhasznalonevInput" class="form-control form-control-md text-light" :class="helytelenFelhasznalonev ? 'border-danger' : 'border-dark'" placeholder="Felhasználónév" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenFelhasznalonev ? 'd-block' : 'd-none'">
            <!-- Figyelmeztetés ikon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            {{ this.uzenet.felhasznalo }}
          </div>
        </div>
      </div>

      <div class="mb-1">
        <label for="emailInput" class="form-label">Email</label>
        <input type="email" v-model="email" @click="helytelenEmail = false" id="emailInput" class="form-control form-control-md text-light" :class="helytelenEmail ? 'border-danger' : 'border-dark'" placeholder="Email" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenEmail ? 'd-block' : 'd-none'">
            <!-- Figyelmeztetés ikon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            {{ this.uzenet.email }}
          </div>
        </div>
      </div>

      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <label for="jelszoInput" class="sarga mt-1">Betű, szám, speciális karakter</label>
        </div>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="jelszo" id="jelszoInput" class="form-control form-control-md text-light rounded border-dark" placeholder="Jelszó" required>
          <div class="btn text-light border-0 jelszoMegjelenit" @click="jelszoMegjelenit = !jelszoMegjelenit">
            <!-- Szem áthúzva ikon -->
            <svg v-if="jelszoMegjelenit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
            <!-- Szem ikon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </div>
        </div>
        <div class="mt-1"></div>
      </div>

      <div class="mb-1">
        <label for="ismeteltJelszoInput" class="form-label">Jelszó újra</label>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="ismeteltJelszo" @click="helytelenIsmeteltJelszo = false" id="ismeteltJelszoInput" class="form-control form-control-md text-light rounded" :class="helytelenIsmeteltJelszo ? 'border-danger' : 'border-dark'" placeholder="Jelszó újra" required>
          <div class="btn text-light border-0 jelszoMegjelenit" @click="jelszoMegjelenit = !jelszoMegjelenit">
            <!-- Szem áthúzva ikon -->
            <svg v-if="jelszoMegjelenit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
            <!-- Szem ikon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </div>
        </div>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenIsmeteltJelszo ? 'd-block' : 'd-none'">
            <!-- Figyelmeztetés ikon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            A jelszavak nem egyeznek
          </div>
          <div class="text-danger" :class="regisztracioHiba ? 'd-block' : 'd-none'">
            <!-- Figyelmeztetés ikon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
              Sikertelen regisztráció
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <input class="form-check-input mb-1" type="checkbox" id="adatvedelemElfogadas" required>&nbsp;
        <label class="form-check-label" for="adatvedelemElfogadas">
          Elfogadom az <RouterLink to="/adatvedelem" class="sarga link">Adatvédelmi Nyilatkozatot</RouterLink>
        </label>
      </div>
      <button type="submit" class="btn btn-md btn-warning w-100 fw-bold text-dark mt-3">Regisztráció</button>
      <div class="d-flex justify-content-center mt-4 navigal">
        <p>Már regisztrált? <RouterLink to="/bejelentkezes" class="sarga link fw-bold">Bejelentkezés</RouterLink></p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useFelhasznaloStore } from '../stores/felhasznalo';
import axios from 'axios';

export default {
  data() {
    return {
      felhasznalonev: '',
      email: '',
      jelszo: '',
      ismeteltJelszo: '',
      jelszoMegjelenit: false,
      helytelenFelhasznalonev: false,
      helytelenEmail: false,
      uzenet: {felhasznalonev:"", email:""},
      helytelenIsmeteltJelszo: false,
      regisztracioHiba: false
    };
  },
  
  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  },
  
  methods: {
    async regisztralas() {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        username: this.felhasznalonev,
        email: this.email,
        password: this.jelszo,
        password2: this.ismeteltJelszo
      })
        .then(response => {
          if (response.data.hasOwnProperty("felhasznalo")) {
            this.helytelenFelhasznalonev = true;
            this.uzenet.felhasznalo = response.data.felhasznalo;
          }

          if(response.data.hasOwnProperty("email")){
            this.helytelenEmail = true;
            this.uzenet.email = response.data.email;
          }

          if (this.ismeteltJelszo !== this.jelszo) {
            this.helytelenIsmeteltJelszo = true;
          }

          // ha sikeres a regisztráció akkor tájékoztatja a felhasználót hogy hitelesítse az emailjét, és visszanavigál a főoldalra
          if(!this.helytelenEmail && !this.helytelenFelhasznalonev && !this.helytelenIsmeteltJelszo) {
            alert(response.data)
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.regisztracioHiba = true;
          console.log('Hiba:', error.message);
        });
    }
  }
}
</script>

<style scoped>
#tartalom{
  padding-top: 40px;
}

#form{
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

.mt-1 {
  height: 24px
}

input, input:focus {
  background-color: #0D1117;
}

.sarga {
  color: rgb(255,200,0);
}

.navigal {
  font-size: 10pt;
}

.link{
  text-decoration: none;
}

.sarga.mt-1 {
  font-size: 9pt;
}

.form-check-label {
  font-size: 8pt;
}

.jelszoMegjelenit {
  position: absolute;
  right: 0;
  z-index: 5;
}

.link:hover{
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