<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="mb-5 text-center">Editar Contato</h2>
        <div v-if="contact" class="card mb-5">
          <div class="card-body">
            <h4 class="mb-4">Alterar dados</h4>
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input type="text" class="form-control" v-model="contact.telefone" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="text" class="form-control" v-model="contact.email" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Tag</label>
                <input type="text" class="form-control" v-model="contact.tag" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Tipo de Contact</label>
                <input type="text" class="form-control" v-model="contact.tipoContato" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Privado</label>
                <input type="text" class="form-control" v-model="contact.privado" required />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
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
import type { Contact } from '../../models/Contact';
import { getContactsByPerson, updateContact } from '../../services/contactService';

const route = useRoute();
const contact = ref<Contact>();

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
      await updateContact(contact.value);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
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
