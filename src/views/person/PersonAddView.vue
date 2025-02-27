<template>
  <div class="row">
    <div class="col-12 col-lg-9 mx-auto">
      <div>
        <h4 class="mb-3">Nova Pessoa</h4>
        <form @submit.prevent="handleUpdate">
          <div class="card p-3 mb-3">
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="mb-0">
                  <label class="form-label">Nome</label>
                  <input type="text" class="form-control" v-model="person.nome" />
                </div>
              </div>
              <div class="col-12 col-lg-6">
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
          </div>
        </form>
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
import { useToast } from 'vue-toast-notification';

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
const toast = useToast();

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
</script>
