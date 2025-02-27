<template>
  <div class="card p-3">
    <div class="d-flex flex-row align-items-center gap-3">
      <div v-if="photoUrl" class="photo-container">
        <img :src="photoUrl" alt="Foto da Pessoa" class="profile-photo" />
      </div>

      <div>
        <div class="file-upload">
          <input type="file" @change="handleFileUpload" accept="image/*" />
          <i class="bi bi-upload"></i> Escolher foto
        </div>

        <button class="btn btn-primary mt-3" @click="handleUploadPhoto" :disabled="!selectedFile">
          <i class="bi bi-cloud-upload"></i> Salvar Foto
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPhoto, uploadPhoto } from '../services/photoService';

const photoUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const props = defineProps<{
  personId: number;
}>();

onMounted(async () => {
  if (props.personId) {
    try {
      const response = await getPhoto(props.personId);
      if (response) {
        photoUrl.value = response;
      }
    } catch (error) {
      console.error('Erro ao carregar a foto:', error);
    }
  }
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    selectedFile.value = target.files[0];
  }
};

const handleUploadPhoto = async () => {
  if (selectedFile.value && props.personId) {
    try {
      const formData = new FormData();
      formData.append('foto', selectedFile.value);

      await uploadPhoto(props.personId, formData);
      photoUrl.value = URL.createObjectURL(selectedFile.value);
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
    }
  }
};
</script>

<style scoped>
.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.file-upload {
  display: inline-block;
  padding: 8px 12px;
  background-color: var(--bs-secondary);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}

.file-upload input {
  display: none;
}
</style>
