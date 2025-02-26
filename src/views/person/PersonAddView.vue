<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <div class="d-flex align-items-center justify-content-between mb-5">
          <h2 class="m-0">Adicionar Person</h2>
        </div>
        <div class="card mb-5">
          <div class="card-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" v-model="person.nome" required />
              </div>
              <div class="mb-3">
                <label class="form-label">CPF</label>
                <input
                  type="text"
                  class="form-control"
                  v-mask="maskPatterns.cpf"
                  v-model="person.cpf"
                  required
                />
              </div>
              <div class="mb-3">
                <h4>Endereço</h4>
              </div>
              <div class="mb-3">
                <label class="form-label">País</label>
                <input type="text" class="form-control" v-model="person.endereco.pais" required />
              </div>
              <div class="mb-3">
                <label class="form-label">CEP</label>
                <input
                  type="text"
                  class="form-control"
                  v-mask="maskPatterns.cep"
                  v-model="person.endereco.cep"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Estado</label>
                <select id="disabledSelect" class="form-select" v-model="person.endereco.estado">
                  <option v-for="estado in ufs" :value="estado">{{ estado }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Cidade</label>
                <input type="text" class="form-control" v-model="person.endereco.cidade" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Bairro</label>
                <input type="text" class="form-control" v-model="person.endereco.bairro" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Logradouro</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="person.endereco.logradouro"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Número</label>
                <input type="text" class="form-control" v-model="person.endereco.numero" required />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Person } from '../../models/Person';
import { updatePerson } from '../../services/personService';
import { maskPatterns } from '../../composables/useMask';
import { ufs } from '../../composables/useUF';

const person = ref<Person>({
  nome: '',
  cpf: '',
  endereco: {
    pais: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: 0,
    id: undefined,
  },
  foto: undefined,
});

async function handleUpdate() {
  if (person.value) {
    try {
      await updatePerson(person.value);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  }
}
</script>
