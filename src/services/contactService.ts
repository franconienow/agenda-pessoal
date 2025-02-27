import type { Contact } from '../models/Contact';
import api from './api';

export async function getContacts(term: string = ''): Promise<Contact[]> {
  try {
    const response = await api.post('/contato/pesquisar', {
      termo: term,
    });
    return response.data;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to search');
  }
}

export async function getContactsByPerson(personId: number): Promise<Contact[]> {
  try {
    const response = await api.get('/contato/listar/' + personId);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar recurso:', error);
    throw new Error('Failed to load');
  }
}

export async function removeContact(contactId: number): Promise<any> {
  try {
    await api.delete('/contato/remover/' + contactId);
  } catch (error) {
    console.error('Erro ao remover recurso:', error);
    throw new Error('Failed to remove');
  }
}

export async function updateContact(contact: Contact): Promise<any> {
  try {
    const response = await api.post(`/contato/salvar`, contact);
    return response;
  } catch (error) {
    console.error('Erro ao salvar recurso:', error);
    throw new Error('Failed to save');
  }
}
