<template>
  <div>
    <h3 class="mb-4">Contatos</h3>
    <search-bar placeholder="Buscar contato..." @search="handleSearch" class="mb-4" />
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="contact in contactsFiltrados" :key="contact.id">
        <contact-card :contact="contact" :is-favorite="contact.favorite" />
      </div>
      <div class="col-12 col-lg-3">
        <add-card :onCustomClick="goToAddContact"></add-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Contact } from '../models/Contact';
import { getContacts } from '../services/contactService';
import { useRouter } from 'vue-router';
import ContactCard from '../components/ContactCard.vue';
import AddCard from '../components/AddCard.vue';
import SearchBar from '../components/SearchBar.vue';
import { getFavorites } from '../services/favoriteService';

const router = useRouter();
const contacts = ref<Contact[]>([]);
const contactsFiltrados = ref<Contact[]>();
const searchTerm = ref<string>('');

function mergeUsers(arr1: Contact[], arr2: Contact[]) {
  const userMap = new Map();
  arr1.forEach((user) => userMap.set(user.id, user));
  arr2.forEach((user) => {
    if (userMap.has(user.id)) {
      userMap.set(user.id, { ...userMap.get(user.id), ...user });
    } else {
      userMap.set(user.id, user);
    }
  });
  return Array.from(userMap.values());
}

async function loadContacts() {
  try {
    let responseContacts = await getContacts();
    let responseFavoriteContacts = await getFavorites();
    responseFavoriteContacts = responseFavoriteContacts.map((user) => {
      return { ...user, favorite: true };
    });

    const unifiedContacts = mergeUsers(responseFavoriteContacts, responseContacts);
    console.log(unifiedContacts);

    contacts.value = unifiedContacts;
    contactsFiltrados.value = unifiedContacts;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
  }
}

function handleSearch(term: string) {
  searchTerm.value = term;
  contactsFiltrados.value = contacts.value.filter((contact) =>
    contact.pessoa?.nome.toLowerCase().includes(term.toLowerCase())
  );
}

function goToAddContact() {
  router.push(`/adicionar-contato`);
}

onMounted(() => {
  loadContacts();
});
</script>
