<template>
  <div
    v-if="contact.id && contact.pessoa && contact.pessoa.id"
    class="card model-card"
    :class="{ 'text-bg-secondary': isFavorite }"
    @click="goToContactSingle(contact.pessoa.id, contact.id)"
  >
    <div v-if="!photoURL" class="card-img-top image-placeholder"></div>
    <img v-if="photoURL" :src="photoURL" class="card-img-top" />
    <div class="card-body">
      <h5 v-if="contact.telefone" class="card-title">{{ contact.telefone }}</h5>
      <h5 v-if="contact.email" class="card-title">{{ contact.email }}</h5>
      <div>{{ contact.tipoContato }}</div>
      <div>{{ contact.tag }}</div>
      <div v-if="contact.privado">Privado</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Contact } from '../models/Contact';
import { onMounted, ref } from 'vue';
import { getPhoto } from '../services/photoService';

const router = useRouter();
const photoURL = ref<string>();

const props = withDefaults(
  defineProps<{
    contact: Contact;
    isFavorite?: boolean;
  }>(),
  {
    isFavorite: false,
  }
);

function goToContactSingle(personId: number, contactId: number) {
  router.push(`/pessoas/${personId}/contatos/${contactId}`);
}

onMounted(async () => {
  if (props.contact.pessoa.id) {
    photoURL.value = await getPhoto(props.contact.pessoa.id);
  }
});
</script>
