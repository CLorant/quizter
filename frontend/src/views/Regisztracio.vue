<template>
  <div id="tartalom" class="my-5 d-flex flex-column justify-content-center align-items-center">
    <form @submit.prevent="regisztralas" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.svg" alt="quizter logó" decoding="async" id="logo" width="250" height="63">
      </div>
      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="felhasznalonevInput" class="form-label">Felhasználónév</label>
          <label for="felhasznalonevInput" class="sarga mt-1">Betű vagy szám</label>
        </div>
        <input type="text" minlength="3" maxlength="12" pattern="[a-zA-Z0-9]+$" v-model="felhasznalonev" @click="helytelenFelhasznalonev = false; regisztracioHiba = false" id="felhasznalonevInput" class="form-control form-control-md text-light" :class="helytelenFelhasznalonev ? 'border-danger' : 'border-dark'" placeholder="Felhasználónév" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenFelhasznalonev ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
            {{ this.uzenet.felhasznalo }}
          </div>
        </div>
      </div>

      <div class="mb-1">
        <label for="emailInput" class="form-label">Email</label>
        <input type="email" v-model="email" @click="helytelenEmail = false; regisztracioHiba = false" id="emailInput" class="form-control form-control-md text-light" :class="helytelenEmail ? 'border-danger' : 'border-dark'" placeholder="Email" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenEmail ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
            {{ this.uzenet.email }}
          </div>
        </div>
      </div>

      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <label for="jelszoInput" class="sarga mt-1">Betű és szám</label>
        </div>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" v-model="jelszo" @click="helytelenIsmeteltJelszo = false; regisztracioHiba = false" id="jelszoInput" class="form-control form-control-md text-light rounded" :class="helytelenIsmeteltJelszo ? 'border-danger' : 'border-dark'" placeholder="Jelszó" required>
          <div class="btn text-light border-0 jelszoMegjelenit" @click="jelszoMegjelenit = !jelszoMegjelenit">
            <img v-if="jelszoMegjelenit" src="/img/ikon/szem-athuzva.svg" alt="szem áthúzva ikon" class="mb-1" decoding="async" height="20" width="20">
            <img v-else src="/img/ikon/szem.svg" alt="szem ikon" class="mb-1" decoding="async" height="20" width="20">
          </div>
        </div>
        <div class="mt-1"></div>
      </div>

      <div class="mb-1">
        <label for="ismeteltJelszoInput" class="form-label">Jelszó újra</label>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" v-model="ismeteltJelszo" @click="helytelenIsmeteltJelszo = false; regisztracioHiba = false" id="ismeteltJelszoInput" class="form-control form-control-md text-light rounded" :class="helytelenIsmeteltJelszo ? 'border-danger' : 'border-dark'" placeholder="Jelszó újra" required>
          <div class="btn text-light border-0 jelszoMegjelenit" @click="jelszoMegjelenit = !jelszoMegjelenit">
            <img v-if="jelszoMegjelenit" src="/img/ikon/szem-athuzva.svg" alt="szem áthúzva ikon" class="mb-1" decoding="async" height="20" width="20">
            <img v-else src="/img/ikon/szem.svg" alt="szem ikon" class="mb-1" decoding="async" height="20" width="20">
          </div>
        </div>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenIsmeteltJelszo ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
            A jelszavak nem egyeznek
          </div>
          <div class="text-danger" :class="regisztracioHiba ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
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
      if (this.ismeteltJelszo !== this.jelszo) {
        this.helytelenIsmeteltJelszo = true;
        return;
      }

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

#logo {
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

.jelszoMegjelenit img {
  margin-top: 3px;
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