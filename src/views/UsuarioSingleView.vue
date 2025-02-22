<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="mb-5 text-center">Editar Contato</h2>
        <div v-if="usuario" class="card mb-5">
          <div class="card-body">
            <h4 class="mb-4">Alterar dados</h4>
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Usuário</label>
                <input type="text" class="form-control" v-model="usuario.username" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" v-model="usuario.nome" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="text" class="form-control" v-model="usuario.email" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input type="text" class="form-control" v-model="usuario.telefone" required />
              </div>
              <div class="mb-3">
                <label class="form-label">CPF</label>
                <input type="text" class="form-control" v-model="usuario.cpf" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Data de Nascimento</label>
                <input type="text" class="form-control" v-model="usuario.dataNascimento" required />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
        <div v-if="usuario" class="card mb-5">
          <div class="card-body">
            <h4 class="mb-4">Alterar minha senha</h4>
            <form @submit.prevent="handlePasswordUpdate">
              <div class="mb-3">
                <label class="form-label">Senha atual</label>
                <input type="password" class="form-control" v-model="userUpdatePasswordFields.password" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Nova senha</label>
                <input type="password" class="form-control" v-model="userUpdatePasswordFields.newPassword" required />
              </div>
              <button type="submit" class="btn btn-secondary">Alterar</button>
            </form>
          </div>
        </div>
        <div v-if="usuario" class="card">
          <div class="card-body">
            <h4 class="mb-4">Alterar permissões</h4>
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select id="disabledSelect" class="form-select" v-model="usuarioTipo">
                  <option value="">Escolha uma opção</option>
                  <option value="ROLE_ADMIN">Administrador</option>
                  <option value="ROLE_USER">Usuário</option>
                </select>
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Usuario } from '../models/Usuario';
import { getUsuarioById, salvarUsuario, updateSenha } from '../services/usuarioService';

const route = useRoute();
const usuario = ref<Usuario>();
const usuarioTipo = ref<string>();
const userUpdatePasswordFields = ref({
  password: '',
  newPassword: '',
});

async function loadUsuario(userId: number) {
  try {
    const response = await getUsuarioById(userId);
    usuario.value = response.object.usuario;
    usuarioTipo.value = response.object.tipos[0]
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

async function handleUpdate() {
  if (usuario.value) {
    try {
      const response = await salvarUsuario({
        tipos: [
          usuarioTipo.value
        ],
        usuario: usuario.value
      });
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  }
}

async function handlePasswordUpdate() {
  if (usuario.value) {
    try {
      const response = await updateSenha({
        username: usuario.value.username,
        password: userUpdatePasswordFields.value.password,
        newPassword: userUpdatePasswordFields.value.newPassword,
      });
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
    }
  }
}

onMounted(async () => {
  const userId = route.params.id;
  if (userId) {
    loadUsuario(Number(userId));
  }
});
</script>
