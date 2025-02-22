<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Agenda Pessoal</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/meu-cadastro">Meu Cadastro</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pessoas">Pessoas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contatos">Contatos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/usuarios">Usuários</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-dark" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { removeToken } from '../services/authService';

const router = useRouter();

function logout() {
  removeToken();
  alert('Logout realizado!');
  router.push('/login');
};
</script>