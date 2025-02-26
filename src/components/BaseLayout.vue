<template>
  <div>
    <header class="bg-light mb-5">
      <nav-bar />
    </header>
    <main class="mb-5">
      <div class="container">
        <router-view />
      </div>
    </main>
    <footer class="bg-light">
      <div class="container">
        <div class="text-center text-muted py-4">&copy; {{ currentYear }} - Agenda Pessoal</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './Navbar.vue';

const currentYear = new Date().getFullYear();
</script>
