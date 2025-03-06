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
                  <input type="text" class="form-control" v-model="user.username" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input type="text" class="form-control" v-model="user.nome" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="user.email" />
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
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">CPF</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.cpf"
                    v-model="user.cpf"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Data de Nascimento</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.dataNasc"
                    v-model="displayData"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    :class="{ 'is-invalid': !passwordValid }"
                  />
                  <div class="invalid-feedback">
                    Use ao menos 8 caracteres, com letras e números
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Role</label>
                  <select id="disabledSelect" class="form-select" v-model="userType">
                    <option value="ROLE_ADMIN">Administrador</option>
                    <option value="ROLE_USER">Usuário</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-3">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { User } from '../../models/User';
import { updateUser } from '../../services/userService';
import { maskPatterns } from '../../composables/useMask';
import { formatAPIDate, formatDefaultDate } from '../../utils/dateUtils';
import { useToast } from 'vue-toast-notification';
import { passwordIsValid } from '../../utils/validationUtils';

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
const toast = useToast();
const passwordValid = computed(() => passwordIsValid(user.value.password));

const displayData = computed({
  get: () => (user.value?.dataNascimento ? formatDefaultDate(user.value?.dataNascimento) : ''),
  set: (value: string) => {
    if (user.value) {
      user.value.dataNascimento = formatAPIDate(value);
    }
  },
});

async function handleUpdate() {
  if (user.value) {
    if (!passwordIsValid(user.value.password)) {
      toast.error('A senha deve ter pelo menos 8 caracteres, incluindo letras e números.');
      return;
    }
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
</script>
