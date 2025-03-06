<template>
  <div v-if="person.id" class="card model-card" @click="goToPersonSingle(person.id)">
    <div v-if="!photoURL" class="card-img-top image-placeholder"></div>
    <img v-if="photoURL" :src="photoURL" class="card-img-top" />
    <div class="card-body">
      <h5>{{ person.nome }}</h5>
      <div>{{ person.cpf }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Person } from '../models/Person';
import { onMounted, ref } from 'vue';
import { getPhoto } from '../services/photoService';

const router = useRouter();
const photoURL = ref<string>();

const props = defineProps<{
  person: Person;
}>();

const goToPersonSingle = (id: number) => {
  router.push(`/pessoas/${id}`);
};

onMounted(async () => {
  if (props.person.id) {
    photoURL.value = await getPhoto(props.person.id);
  }
});
</script>
