<template>
  <div>
    <h3 class="mb-4">Contacts</h3>
    <search-bar placeholder="Buscar contato..." @search="handleSearch" class="mb-4" />
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="contact in contactsFiltrados" :key="contact.id">
        <contact-card :contact="contact" />
      </div>
      <div class="col-12 col-lg-3">
        <add-card :onCustomClick="goToAddContact"></add-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Contact } from '../../models/Contact';
import { getContacts } from '../../services/contactService';
import { useRouter } from 'vue-router';
import ContactCard from '../../components/ContactCard.vue';
import AddCard from '../../components/AddCard.vue';
import SearchBar from '../../components/SearchBar.vue';

const router = useRouter();
const contacts = ref<Contact[]>([]);
const contactsFiltrados = ref<Contact[]>();
const searchTerm = ref<string>('');

async function loadContacts() {
  try {
    const response = await getContacts();
    contacts.value = response;
    contactsFiltrados.value = response;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
  }
}

function handleSearch(term: string) {
  searchTerm.value = term;
  contactsFiltrados.value = contacts.value.filter((contact) =>
    contact.pessoa.nome.toLowerCase().includes(term.toLowerCase())
  );
}

function goToAddContact() {
  router.push(`/adicionar-contato`);
}

onMounted(() => {
  loadContacts();
});
</script>
