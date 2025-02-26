<template>
  <div v-if="user.id" class="card model-card" @click="goToUserSingle(user.id)">
    <div class="card-body">
      <h5>{{ user.nome }}</h5>
      <div>{{ user.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { User } from '../models/User';

const router = useRouter();

const props = defineProps<{
  user: User;
}>();

const goToUserSingle = (id: number) => {
  router.push(`/usuarios/${id}`);
};
</script>
