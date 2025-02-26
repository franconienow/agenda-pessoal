<template>
  <div v-if="user">
    <div class="row">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="mb-5 text-center">Meu Cadastro</h2>
        <div class="card mb-5">
          <div class="card-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Usuário</label>
                <input type="text" class="form-control" v-model="user.username" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" v-model="user.nome" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="user.email" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input
                  type="text"
                  class="form-control"
                  v-mask="maskPatterns.telefone"
                  v-model="user.telefone"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">CPF</label>
                <input
                  type="text"
                  class="form-control"
                  v-mask="maskPatterns.cpf"
                  v-model="user.cpf"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Data de Nascimento</label>
                <input
                  type="text"
                  class="form-control"
                  v-mask="maskPatterns.dataNasc"
                  v-model="displayData"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
        <div v-if="user" class="card">
          <div class="card-body">
            <h4 class="mb-4">Alterar minha senha</h4>
            <form @submit.prevent="handlePasswordUpdate">
              <div class="mb-3">
                <label class="form-label">Senha atual</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="userUpdatePasswordFields.password"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Nova senha</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="userUpdatePasswordFields.newPassword"
                  required
                />
              </div>
              <button type="submit" class="btn btn-secondary">Alterar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { User } from '../models/User';
import { getUserById, updatePassword, updateCurrentUser } from '../services/userService';
import { getUserId } from '../services/authService';
import { maskPatterns } from '../composables/useMask';
import { formatAPIDate, formatDefaultDate } from '../utils/dateUtils';

const user = ref<User>();
const userUpdatePasswordFields = ref({
  password: '',
  newPassword: '',
});

const displayData = computed({
  get: () => (user.value?.dataNascimento ? formatDefaultDate(user.value?.dataNascimento) : ''),
  set: (value: string) => {
    if (user.value) {
      user.value.dataNascimento = formatAPIDate(value);
    }
  },
});

async function loadUser() {
  const userId = getUserId();
  if (userId) {
    try {
      const response = await getUserById(Number(userId));
      user.value = response.object.usuario;
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  }
}

async function handleUpdate() {
  if (user.value) {
    try {
      const response = await updateCurrentUser(user.value);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  }
}

async function handlePasswordUpdate() {
  if (user.value) {
    try {
      const response = await updatePassword({
        username: user.value.username,
        password: userUpdatePasswordFields.value.password,
        newPassword: userUpdatePasswordFields.value.newPassword,
      });
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
    }
  }
}

onMounted(async () => {
  loadUser();
});
</script>
