<template>
  <div>
    <h3>Lista de Contatos</h3>

    <div class="mb-3">
      <input type="text" class="form-control" v-model="termoPesquisa" placeholder="Pesquisar contatos..."
        @input="searchContatos" />
    </div>

    <div v-if="contatos.length === 0" class="alert alert-warning">
      Nenhum contato encontrado.
    </div>

    <h3 class="mb-4">Favoritos</h3>
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="contato in contatos" :key="contato.id">
        <contato-card :contato="contato" :isFavorito="true"></contato-card>
      </div>
    </div>

    <h3 class="mb-4">Contatos</h3>
    <div class="row g-3">
      <div class="col-12 col-lg-3" v-for="contato in contatos" :key="contato.id">
        <contato-card :contato="contato"></contato-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getContatos } from '../services/contatoService';
import { getFavoritos, salvarFavorito } from '../services/favoritoService';
import type { Contato } from '../models/Contato';
import ContatoCard from '../components/ContatoCard.vue';

const contatos = ref<Contato[]>([]);
const favoritos = ref<Contato[]>([]);
const termoPesquisa = ref('');

async function loadContatos() {
  try {
    const response = await getContatos();
    contatos.value = response;
  } catch (error) {
    console.error('Erro ao carregar contatos:', error);
  }
};

async function loadFavoritos() {
  try {
    const response = await getFavoritos();
    favoritos.value = response;
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
  }
};

async function searchContatos() {
  if (termoPesquisa.value.trim() === '') {
    loadContatos();
    return;
  }

  try {
    const response = await getContatos(termoPesquisa.value);
    contatos.value = response;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
  }
};

async function favoritarContato(contato: any) {
  try {
    await salvarFavorito(contato.id);
    loadFavoritos();
  } catch (error) {
    console.error('Erro ao favoritar contato:', error);
  }
};

async function removerFavorito(contato: any) {
  try {
    await removerFavorito(contato.id);
    loadFavoritos();
  } catch (error) {
    console.error('Erro ao desfavoritar contato:', error);
  }
};

function isFavorito(contato: any) {
  return favoritos.value.some((fav) => fav.id === contato.id);
};

async function removerContato(id: number) {
  if (!confirm('Tem certeza que deseja excluir este contato?')) return;

  try {
    await removerContato(id);
    contatos.value = contatos.value.filter(c => c.id !== id);
  } catch (error) {
    console.error('Erro ao remover contato:', error);
  }
};

function getFotoUrl(pessoaId: number) {
  return `http://seu-servidor.com/api/foto/download/${pessoaId}`;
};

onMounted(() => {
  loadContatos();
  loadFavoritos();
});
</script>
