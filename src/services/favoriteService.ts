import type { Contact } from '../models/Contact';
import api from './api';

export async function getFavorites(): Promise<Contact[]> {
  try {
    const response = await api.get('/favorito/pesquisar');
    return response.data;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to search contacts');
  }
}

export async function removeFavorite(contactId: number): Promise<any> {
  try {
    await api.delete('/favorito/remover/' + contactId);
  } catch (error) {
    console.error('Erro ao remover contato:', error);
    throw new Error('Failed to remove contact');
  }
}

export async function updateFavorite(contact: Contact): Promise<any> {
  try {
    const response = await api.post(`/favorito/salvar`, contact);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    throw new Error('Failed to save contact');
  }
}
