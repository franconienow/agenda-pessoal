<template>
  <div>
    <h3 class="mb-4">Pessoas</h3>
    <search-bar placeholder="Buscar pessoa..." @search="handleSearch" class="mb-4" />
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="person in filterdPersons" :key="person.id">
        <person-card :person="person"></person-card>
      </div>
      <div class="col-12 col-lg-3">
        <add-card :onCustomClick="goToAddPerson"></add-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Person } from '../../models/Person';
import { getPersons } from '../../services/personService';
import { useRouter } from 'vue-router';
import PersonCard from '../../components/PersonCard.vue';
import AddCard from '../../components/AddCard.vue';
import SearchBar from '../../components/SearchBar.vue';

const router = useRouter();
const persons = ref<Person[]>([]);
const searchTerm = ref<string>('');
const filterdPersons = ref<Person[]>(persons.value);

async function loadPersons() {
  try {
    const response = await getPersons();
    persons.value = response;
    filterdPersons.value = response;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
  }
}

function handleSearch(term: string) {
  searchTerm.value = term;
  filterdPersons.value = persons.value.filter((person) =>
    person.nome.toLowerCase().includes(term.toLowerCase())
  );
}

function goToAddPerson() {
  router.push(`/adicionar-pessoa`);
}

onMounted(() => {
  loadPersons();
});
</script>
