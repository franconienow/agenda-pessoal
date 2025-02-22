<template>
  <div v-if="usuario.id" class="card model-card" @click="goToUsuarioSingle(usuario.id)">
    <div class="card-body">
      <h5>{{ usuario.nome }}</h5>
      <div>{{ usuario.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Usuario } from '../models/Usuario';

const props = defineProps<{
  usuario: Usuario;
}>();

const router = useRouter();
const goToUsuarioSingle = (id: number) => {
  router.push(`/usuarios/${id}`);
};
</script>
