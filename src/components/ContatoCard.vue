<template>
  <div class="card" :class="{ 'border-primary': isFavorito }">
    <div class="card-header">
      {{ contato.tipoContato }}
    </div>
    <div class="card-body">
      <h5 v-if="contato.telefone" class="card-title">{{ contato.telefone }}</h5>
      <h5 v-if="contato.email" class="card-title">{{ contato.email }}</h5>
      <div class="mb-2">
        <div>{{ contato.tag }}</div>
        <div v-if="contato.privado">Privado</div>
      </div>
    </div>
    <div class="card-footer">
      <a href="#" class="link-primary me-2">Favoritar</a>
      <a href="#" class="link-primary me-2">Deletar</a>
      <a href="#" class="link-primary">Editar</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contato } from '../models/Contato';

const props = withDefaults(defineProps<{
  contato: Contato;
  isFavorito?: boolean;
}>(), {
  isFavorito: false
});
</script>
