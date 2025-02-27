<template>
  <div class="row">
    <div class="col-12 col-lg-9 mx-auto">
      <div v-if="contact">
        <h4 class="mb-3">Novo Contato</h4>
        <form @submit.prevent="handleUpdate">
          <div class="card p-3 mb-3">
            <div
              v-if="contact.tipoContato == 'TELEFONE' || contact.tipoContato == 'CELULAR'"
              class="mb-3"
            >
              <label class="form-label">Número</label>
              <input
                type="text"
                class="form-control"
                v-mask="maskPatterns.telefone"
                v-model="contact.telefone"
              />
            </div>
            <div v-if="contact.tipoContato == 'EMAIL'" class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" class="form-control" v-model="contact.email" />
            </div>
            <div class="mb-3">
              <label class="form-label">Tag</label>
              <input type="text" class="form-control" v-model="contact.tag" />
            </div>
            <div class="mb-3">
              <label class="form-label">Tipo Contato</label>
              <select id="disabledSelect" class="form-select" v-model="contact.tipoContato">
                <option v-for="tipo in tiposContato" :value="tipo">{{ tipo }}</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="form-check form-switch">
                <label class="form-check-label">Privado</label>
                <input class="form-check-input" type="checkbox" v-model="contact.privado" />
              </div>
            </div>
            <div class="mb-0">
              <label class="form-label">Pessoa</label>
              <select id="disabledSelect" class="form-select" v-model="contact.pessoa">
                <option v-for="person in persons" :value="person">{{ person.nome }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Contact } from '../../models/Contact';
import { updateContact } from '../../services/contactService';
import { maskPatterns } from '../../composables/useMask';
import { tiposContato } from '../../composables/useTiposContato';
import { useToast } from 'vue-toast-notification';
import { getPersons } from '../../services/personService';
import type { Person } from '../../models/Person';
import { getUserById } from '../../services/userService';
import { getUserId } from '../../services/authService';
import type { User } from '../../models/User';

const contact = ref<Contact>({
  email: '',
  telefone: '',
  tipoContato: 'EMAIL',
  tag: '',
  privado: false,
  pessoa: undefined,
  usuario: undefined,
});
const toast = useToast();
const persons = ref<Person[]>([]);
const user = ref<User>();

async function handleUpdate() {
  if (contact.value && user.value) {
    try {
      contact.value.usuario = user.value;
      const response = await updateContact(contact.value);
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

async function loadPersons() {
  try {
    const response = await getPersons();
    persons.value = response;
  } catch (error) {
    console.error(error);
  }
}

async function loadUser() {
  const userId = getUserId();
  if (userId) {
    try {
      const response = await getUserById(Number(userId));
      user.value = response.object.usuario;
    } catch (error) {
      console.error(error);
    }
  }
}

onMounted(async () => {
  loadPersons();
  loadUser();
});
</script>
