<template>
  <div>
    <h3 class="mb-4">Usuários</h3>
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="usuario in usuarios" :key="usuario.id">
        <usuario-card :usuario="usuario"></usuario-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Usuario } from '../models/Usuario';
import { getUsuarios } from '../services/usuarioService';
import UsuarioCard from '../components/UsuarioCard.vue';

const usuarios = ref<Usuario[]>([]);

async function loadUsuarios() {
  try {
    const response = await getUsuarios();
    usuarios.value = response;
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
};

onMounted(() => {
  loadUsuarios();
});
</script>
