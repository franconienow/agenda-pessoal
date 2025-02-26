<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="mb-5 text-center">Adicionar Usuário</h2>
        <div class="card mb-5">
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
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
                <input type="text" class="form-control" v-model="user.email" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input type="text" class="form-control" v-model="user.telefone" required />
              </div>
              <div class="mb-3">
                <label class="form-label">CPF</label>
                <input type="text" class="form-control" v-model="user.cpf" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Data de Nascimento</label>
                <input type="text" class="form-control" v-model="user.dataNascimento" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" class="form-control" v-model="user.password" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select id="disabledSelect" class="form-select" v-model="userType">
                  <option value="ROLE_ADMIN">Administrador</option>
                  <option value="ROLE_USER">Usuário</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
              <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../../models/User';
import { updateUser } from '../../services/userService';

const user = ref<User>({
  cpf: '',
  dataNascimento: '',
  email: '',
  nome: '',
  password: '',
  telefone: '',
  username: '',
  id: undefined,
});
const userType = ref<string>();
const errorMessage = ref('');

async function handleSubmit() {
  if (user.value) {
    try {
      await updateUser({
        tipos: [userType.value],
        user: user.value,
      });
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      errorMessage.value = 'Erro ao adicionar novo usuário!';
    }
  }
}
</script>
