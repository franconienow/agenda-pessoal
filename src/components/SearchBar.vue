<template>
  <div>
    <input
      class="form-control"
      type="text"
      v-model="searchTerm"
      :placeholder="placeholder"
      @input="handleSearch"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['search']);
const searchTerm = ref('');

const props = defineProps<{
  placeholder: string;
}>();

const handleSearch = () => {
  emit('search', searchTerm.value);
};
</script>
