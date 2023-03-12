<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          const res = await axios.post('/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          
        }
        catch (error) {
          
        }
        this.$router.push("/")
      },
    },
  };
</script>

<template>
  <div id="tartalom" class="my-5 d-flex flex-column justify-content-center align-items-center">
    <form @submit.prevent="register" class="needs-validation rounded bg-dark p-4" id="form" novalidate>
      <div class="d-flex justify-content-center mb-5">
        <img src="/img/ikon/quizterlogo.webp" alt="Logo" class="w-75">
      </div>

      <div class="mb-4">
        <label for="name" class="form-label col">Felhasználónév</label>
        <input type="name" class="form-control form-control-md text-light border-dark" id="username" v-model="name" required>
        <div class="invalid-feedback">
          Kérem írja be a felhasználónevét.
        </div>
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control form-control-md text-light border-dark" id="email" v-model="email" required>
        <div class="invalid-feedback">
          Kérem írjon be egy megfelelő email címet.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Jelszó</label>
        <input type="password" class="form-control form-control-md text-light border-dark" id="password" v-model="password" required>
        <div class="invalid-feedback">
          Kérem írja be a jelszavát.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Jelszó újra</label>
        <input type="password" class="form-control form-control-md text-light border-dark" required>
        <div class="invalid-feedback">
          Kérem újra írja be a jelszavát.
        </div>
      </div>

      <button type="submit" class="btn btn-md btn-warning w-100 mt-4">Regisztráció</button>
      <div class="d-flex justify-content-center mt-4">
        <p>Már regisztrált? <RouterLink to="/bejelentkezes" class="link">Bejelentkezés</RouterLink></p>
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