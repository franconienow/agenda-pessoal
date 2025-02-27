<template>
  <div class="row">
    <div class="col-12 col-lg-9 mx-auto">
      <div v-if="person">
        <form @submit.prevent="handleUpdate">
          <div class="row mb-3">
            <div class="col-12 col-lg-7">
              <div class="card p-3">
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input type="text" class="form-control" v-model="person.nome" />
                </div>
                <div class="mb-0">
                  <label class="form-label">CPF</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.cpf"
                    v-model="person.cpf"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <photo-upload v-if="person.id" :personId="person.id" />
            </div>
          </div>
          <div class="card p-3 mb-3">
            <div class="row">
              <div class="col-12">
                <h4 class="mb-3">Endereço</h4>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">País</label>
                  <input type="text" class="form-control" v-model="person.endereco.pais" />
                </div>
              </div>
              <div class="col-12 col-lg-3">
                <div class="mb-3">
                  <label class="form-label">CEP</label>
                  <input
                    type="text"
                    class="form-control"
                    v-mask="maskPatterns.cep"
                    v-model="person.endereco.cep"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-3">
                <div class="mb-3">
                  <label class="form-label">Estado</label>
                  <select id="disabledSelect" class="form-select" v-model="person.endereco.estado">
                    <option v-for="estado in ufs" :value="estado">{{ estado }}</option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Cidade</label>
                  <input type="text" class="form-control" v-model="person.endereco.cidade" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Bairro</label>
                  <input type="text" class="form-control" v-model="person.endereco.bairro" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Logradouro</label>
                  <input type="text" class="form-control" v-model="person.endereco.logradouro" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Número</label>
                  <input type="text" class="form-control" v-model="person.endereco.numero" />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-outline-danger" @click="handleRemove">
              <i class="bi bi-trash2"></i> Remover
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Person } from '../../models/Person';
import { getPersonById, removePerson, updatePerson } from '../../services/personService';
import { maskPatterns } from '../../composables/useMask';
import { ufs } from '../../composables/useUF';
import PhotoUpload from '../../components/PhotoUpload.vue';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const router = useRouter();
const person = ref<Person>();
const toast = useToast();

async function loadUser(personId: number) {
  try {
    const response = await getPersonById(personId);
    person.value = response.object;
  } catch (error) {
    console.error(error);
  }
}

async function handleUpdate() {
  if (person.value) {
    try {
      const response = await updatePerson(person.value);
      if (response.status == 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Erro na requisição');
      console.error(error);
    }
  }
}

async function handleRemove() {
  if (person.value && person.value.id && window.confirm('Remover o registro')) {
    try {
      const response = await removePerson(person.value.id);
      router.push(`/pessoas`);
    } catch (error) {
      toast.error('Erro na requisição');
      console.error(error);
    }
  }
}

onMounted(async () => {
  const personId = route.params.id;
  if (personId) {
    loadUser(Number(personId));
  }
});
</script>
