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
        const response = await axios.post('/api/login', {
          name: this.name,
          password: this.password,
        });
        // handle success response
      } catch (error) {
        // handle error response
      }
    },
  }
}
</script>

<template>
  <div id="tartalom">
    <form @submit.prevent="login" class="needs-validation" novalidate>
      <div class="mb-4">
        <label for="name" class="form-label col">Felhasználónév</label>
        <input type="name" class="form-control form-control-lg bg-dark text-light border-secondary w-25 col" id="username" v-model="name" required>
        <div class="invalid-feedback">
          Kérem írja be a felhasználónevét.
        </div>
      </div>

      <div class="mb-4">
        <label for="password" class="form-label mr-2">Jelszó</label>
        <input type="password" class="form-control form-control-lg bg-dark text-light border-secondary w-25" id="password" v-model="password" required>
        <div class="invalid-feedback">
          Kérem írja be a jelszavát.
        </div>
      </div>

      <button type="submit" class="btn btn-secondary">Login</button>
    </form>
  </div>
</template>

<style scoped>
  #tartalom {
    margin-top: 100px;
  }
</style>