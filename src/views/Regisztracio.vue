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
        <input type="text" minlength="3" maxlength="12" pattern="[a-zA-Z0-9]+$" v-model="felhasznalonev" id="felhasznalonevInput" class="form-control form-control-md text-light border-dark" placeholder="Felhasználónév" required>
        <div class="mt-1" />
      </div>

      <div class="mb-1">
        <label for="emailInput" class="form-label">Email</label>
        <input type="email" v-model="email" id="emailInput" class="form-control form-control-md text-light border-dark" placeholder="Email" required>
        <div class="mt-1" />
      </div>

      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <label for="jelszoInput" class="sarga mt-1">Betű, szám, speciális karakter</label>
        </div>
        
        <input type="password" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="jelszo" id="jelszoInput" class="form-control form-control-md text-light border-dark" placeholder="Jelszó" required>
        <div class="mt-1" />
      </div>

      <div class="mb-1">
        <label for="ismeteltJelszoInput" class="form-label">Jelszó újra</label>
        <input type="password" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="ismeteltJelszo" @click="helytelenIsmeteltJelszo = false" id="ismeteltJelszoInput" class="form-control form-control-md text-light" :class="helytelenIsmeteltJelszo ? 'border-danger' : 'border-dark'" placeholder="Jelszó újra" required>
        <div class="mt-1">
          <div class="text-danger" :class="helytelenIsmeteltJelszo ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            A jelszavak nem egyeznek
          </div>
          <div class="text-danger" :class="regisztracioHiba ? 'd-block' : 'd-none'">
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
      }

      if(!this.helytelenIsmeteltJelszo) {
        await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          username: this.felhasznalonev,
          email: this.email,
          password: this.jelszo,
          password2: this.ismeteltJelszo
        })
          .then(response => {
            
          })
          .catch(error => {
            this.regisztracioHiba = true;
            console.log(error);
          });
      }
    }
  }
};
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