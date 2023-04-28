<template>
  <Hiba v-if="hiba" />
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom" class="my-5 d-flex justify-content-center">
    <form @submit.prevent="rpUpdate" class="needs-validation rounded bg-dark p-4" id="form">
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.svg" alt="quizter logó" decoding="async" id="logo" width="250" height="63">
      </div>
      
      <div class="mb-1">
        <div class="d-flex justify-content-between">
          <label for="jelszoInput" class="form-label">Jelszó</label>
          <label for="jelszoInput" class="sarga mt-1">Betű és szám</label>
        </div>
        <div class="input-group">
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" v-model="jelszo" @click="helytelenIsmeteltJelszo = false; jelszoModositasHiba = false" id="jelszoInput" class="form-control form-control-md text-light rounded border-dark" placeholder="Jelszó" required>
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
          <input :type="jelszoMegjelenit ? 'text' : 'password'" minlength="8" pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" v-model="ismeteltJelszo" @click="helytelenIsmeteltJelszo = false; jelszoModositasHiba = false" id="ismeteltJelszoInput" class="form-control form-control-md text-light rounded" :class="helytelenIsmeteltJelszo ? 'border-danger' : 'border-dark'" placeholder="Jelszó újra" required>
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
          <div class="text-danger" :class="jelszoModositasHiba ? 'd-block' : 'd-none'">
            <img src="/img/ikon/figyelmeztetes.svg" alt="figyelmeztetés ikon" class="mb-1" decoding="async" height="14" width="14">
              Sikertelen jelszó módosítás
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-md btn-warning w-100 my-2 fw-bold text-dark">Jelszó módosítása</button>
    </form>
  </div>
</template>

<script>
import Toltes from '../components/Toltes.vue';
import Hiba from '../components/Hiba.vue';
import axios from 'axios';

export default {
  components: {
    Toltes,
    Hiba
  },

  data() {
    return {
      toltes: true,
      hiba: false,
      jelszo: '',
      ismeteltJelszo: '',
      jelszoMegjelenit: false,
      helytelenIsmeteltJelszo: false,
      jelszoModositasHiba: false
    }
  },

  created() {
    this.rpCheck();
  },

  methods: {
    async rpCheck() {
      await axios.post(`${import.meta.env.VITE_API_URL}/rpCheck`, {
        token: this.$route.params.token
      })
        .then(response => {
          this.toltes = false
        })
        .catch(error => {
          this.hiba = true;
          console.log(error.message);
        })
    },

    async rpUpdate() {
      if (this.ismeteltJelszo !== this.jelszo) {
        this.helytelenIsmeteltJelszo = true;
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/rpUpdate`, {
        token: this.$route.params.token,
        password: this.jelszo,
        password2: this.ismeteltJelszo
      })
        .then(response => {
          this.$router.push("/")
        })
        .catch(error => {
          this.jelszoModositasHiba = true;
          console.log(error.message);
        })
    },
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
