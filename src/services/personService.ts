import type { Person } from '../models/Person';
import api from './api';

export async function getPersons(nome: string = ''): Promise<Person[]> {
  try {
    const response = await api.post('/pessoa/pesquisar', {
      nome: nome,
    });
    return response.data;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to get');
  }
}

export async function getPersonById(personId: number): Promise<any> {
  try {
    const response = await api.get('/pessoa/buscar/' + personId);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
    throw new Error('Failed to get');
  }
}

export async function removePerson(personId: number): Promise<any> {
  try {
    await api.delete('/pessoa/remover/' + personId);
  } catch (error) {
    console.error('Erro ao remover recurso:', error);
    throw new Error('Failed to remove');
  }
}

export async function updatePerson(updatedPerson: Person): Promise<any> {
  try {
    const response = await api.post(`/pessoa/salvar`, updatedPerson);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar recurso:', error);
    throw new Error('Failed to save');
  }
}
