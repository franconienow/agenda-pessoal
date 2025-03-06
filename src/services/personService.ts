import type { Person } from '../models/Person';
import api from './api';

export async function getPersons(nome: string = ''): Promise<Person[]> {
  const response = await api.post('/pessoa/pesquisar', {
    nome: nome,
  });
  return response.data;
}

export async function getPersonById(personId: number): Promise<any> {
  const response = await api.get('/pessoa/buscar/' + personId);
  return response.data;
}

export async function removePerson(personId: number): Promise<any> {
  // Rota está retorando uma exceção do hibernate
  const response = await api.delete('/pessoa/remover/' + personId);
  return response;
}

export async function updatePerson(updatedPerson: Person): Promise<any> {
  const response = await api.post(`/pessoa/salvar`, updatedPerson);
  return response;
}
