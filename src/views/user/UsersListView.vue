<template>
  <div>
    <h3 class="mb-4">Usuários</h3>
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="user in users" :key="user.id">
        <user-card :user="user"></user-card>
      </div>
      <div class="col-12 col-lg-3">
        <add-card :onCustomClick="goToAddUser"></add-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { User } from '../../models/User';
import { getUsers } from '../../services/userService';
import { useRouter } from 'vue-router';
import UserCard from '../../components/UserCard.vue';
import AddCard from '../../components/AddCard.vue';

const users = ref<User[]>([]);
const router = useRouter();

async function loadUsers() {
  try {
    const response = await getUsers();
    users.value = response;
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

function goToAddUser() {
  router.push(`/adicionar-usuario`);
}

onMounted(() => {
  loadUsers();
});
</script>
