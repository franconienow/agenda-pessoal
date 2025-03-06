<template>
  <div @click="props.onCustomClick" class="card model-card">
    <div class="d-flex h-100 align-items-center justify-content-center py-4">
      <i class="bi bi-plus-circle fs-4"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  onCustomClick: () => void;
}>();
</script>
