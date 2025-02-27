<template>
  <div class="row">
    <div class="col-12 col-lg-9 mx-auto">
      <div v-if="user">
        <form @submit.prevent="handleUpdate">
          <div class="card p-3 mb-3">
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Usuário</label>
                  <input type="text" class="form-control" v-model="user.username" required />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input type="text" class="form-control" v-model="user.nome" required />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="user.email" required />
                </div>
              </div>
              <div class="col-12 col-lg-6">
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
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">CPF</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.cpf"
                    v-model="user.cpf"
                    required
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Data de Nascimento</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.dataNasc"
                    v-model="displayData"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-3">Salvar</button>
        </form>
        <form @submit.prevent="handlePasswordUpdate">
          <h4 class="mb-3">Alterar senha</h4>
          <div class="card p-3 mb-3">
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Senha atual</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="userUpdatePasswordFields.password"
                    required
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Nova senha</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="userUpdatePasswordFields.newPassword"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-secondary mb-3">Alterar</button>
        </form>
        <form @submit.prevent="handleUpdate">
          <h4 class="mb-3">Alterar permissões</h4>
          <div class="card p-3 mb-3">
            <div class="mb-0">
              <label class="form-label">Role</label>
              <select id="disabledSelect" class="form-select" v-model="userType">
                <option value="ROLE_ADMIN">Administrador</option>
                <option value="ROLE_USER">Usuário</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-secondary mb-3">Alterar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { User } from '../../models/User';
import { getUserById, updateUser, updatePassword } from '../../services/userService';
import { maskPatterns } from '../../composables/useMask';
import { formatAPIDate, formatDefaultDate } from '../../utils/dateUtils';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const user = ref<User>();
const userType = ref<string>();
const userUpdatePasswordFields = ref({
  password: '',
  newPassword: '',
});
const toast = useToast();

const displayData = computed({
  get: () => (user.value?.dataNascimento ? formatDefaultDate(user.value?.dataNascimento) : ''),
  set: (value: string) => {
    if (user.value) {
      user.value.dataNascimento = formatAPIDate(value);
    }
  },
});

async function loadUser(userId: number) {
  try {
    const response = await getUserById(userId);
    user.value = response.object.usuario;
    userType.value = response.object.tipos[0];
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

async function handleUpdate() {
  if (user.value) {
    try {
      const response = await updateUser({
        tipos: [userType.value],
        usuario: user.value,
      });
      if (response.status == 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Erro na requisição');
      console.error(error);
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
      if (response.status == 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Erro na requisição');
      console.error(error);
    }
  }
}

onMounted(async () => {
  const userId = route.params.id;
  if (userId) {
    loadUser(Number(userId));
  }
});
</script>
