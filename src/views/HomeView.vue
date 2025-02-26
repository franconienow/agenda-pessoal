<template>
  <div>
    <h3 class="mb-4">Contatos</h3>
    <search-bar placeholder="Buscar contato..." @search="handleSearch" class="mb-4" />
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="contato in filteredContacts" :key="contato.id">
        <contact-card :contact="contato" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getContacts } from '../services/contactService';
import type { Contact } from '../models/Contact';
import ContactCard from '../components/ContactCard.vue';
import SearchBar from '../components/SearchBar.vue';

const contacts = ref<Contact[]>([]);
const termoPesquisa = ref('');
const filteredContacts = ref<Contact[]>(contacts.value);

async function loadContacts() {
  try {
    const response = await getContacts();
    contacts.value = response;
    filteredContacts.value = response;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
  }
}

function handleSearch(term: string) {
  termoPesquisa.value = term;
  filteredContacts.value = contacts.value.filter((contact) =>
    contact.pessoa.nome.toLowerCase().includes(term.toLowerCase())
  );
}

onMounted(() => {
  loadContacts();
});
</script>
