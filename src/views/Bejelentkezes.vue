<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const res = await axios.post('/api/login', {
            name: this.name,
            password: this.password,
          });
        }
        catch (error) {
          
        }
      },
    }
  }
</script>

<template>
  <div id="tartalom" class="my-5 d-flex flex-column justify-content-center align-items-center">
    <form @submit.prevent="login" class="needs-validation rounded bg-dark p-4" id="form" novalidate>
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.webp" alt="Logo" decoding="async" class="w-75">
      </div>
      
      <div class="mb-4">
        <label for="name" class="form-label col">Felhasználónév</label>
        <input type="name" class="form-control form-control-md text-light border-dark" id="username" v-model="name" minlength="3" maxlength="12" required>
        <div class="invalid-feedback">
          Kérem írja be a felhasználónevét.
        </div>
      </div>

      <div class="mb-4">
        <div class="d-flex justify-content-between">
          <label for="password" class="form-label">Jelszó</label>
          <a href="#" class="link">Elfelejtett jelszó?</a>
        </div>
        <input type="password" class="form-control form-control-md text-light border-dark" id="password" v-model="password" minlength="8" required>
        <div class="invalid-feedback">
          Kérem írja be a jelszavát.
        </div>
      </div>
      <button type="submit" class="btn btn-md btn-warning w-100 mt-4">Bejelentkezés</button>
      <div class="d-flex justify-content-center mt-4">
        <p>Új a Quizteren? <RouterLink to="/regisztracio" class="link">Regisztráció</RouterLink></p>
      </div>
    </form>
  </div>
</template>

<style scoped>
  #tartalom{
    height: 700px;
  }
  #form{
    max-width: 350px;
    width: 95%;
  }
  input, input:focus {
    background-color: #0D1117;
  }
  .link{
    color: rgb(255,200,0);
    text-decoration: none;
  }
  .link:hover{
    opacity: 0.8;
  }
</style>