<template>
  <div class="row">
    <div class="col-12 col-lg-9 mx-auto">
      <div v-if="contact">
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
              <div class="form-check form-switch">
                <label class="form-check-label">Favorito</label>
                <input class="form-check-input" type="checkbox" v-model="contact.favorite" />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-outline-danger" @click="handleRemove">
              <i class="bi bi-trash2"></i> Remover
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Contact } from '../../models/Contact';
import { getContactsByPerson, removeContact, updateContact } from '../../services/contactService';
import { maskPatterns } from '../../composables/useMask';
import { tiposContato } from '../../composables/useTiposContato';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const contact = ref<Contact>();
const toast = useToast();

async function loadContact(personId: number, contactId: number) {
  try {
    const response = await getContactsByPerson(personId);
    const contactAchado = response.find((c) => c.id == contactId);
    contact.value = contactAchado;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

async function handleUpdate() {
  if (contact.value) {
    try {
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

async function handleRemove() {
  if (contact.value && contact.value.id && window.confirm('Remover o registro')) {
    try {
      const response = await removeContact(contact.value.id);
      if (response.status == 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  }
}

onMounted(async () => {
  const personId = route.params.personId;
  const contactId = route.params.contactId;
  if (contactId) {
    loadContact(Number(personId), Number(contactId));
  }
});
</script>
