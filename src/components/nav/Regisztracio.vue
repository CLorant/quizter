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
      const response = await axios.post('/api/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      // handle success response
    } catch (error) {
      // handle error response
    }
  },
  },
};
</script>

<template>
  <form @submit.prevent="register" class="needs-validation" novalidate>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" v-model="name" required>
      <div class="invalid-feedback">
        Please enter your name.
      </div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" required>
      <div class="invalid-feedback">
        Please enter a valid email address.
      </div>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required>
      <div class="invalid-feedback">
        Please enter a password.
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</template>