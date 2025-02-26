<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card">
      <div class="card-body p-4">
        <h3 class="text-center mb-3">Login</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Usuário</label>
            <input name="username" autocomplete="username" type="text" class="form-control" v-model="username"
              required />
          </div>
          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input name="password" autocomplete="password" type="password" class="form-control" v-model="password"
              required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    await login(username.value, password.value);
    router.push('/');
  } catch (error) {
    errorMessage.value = 'Credenciais inválidas!';
  }
};
</script>

<style scoped>
.card {
  width: 400px;
}
</style>
