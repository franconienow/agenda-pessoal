import type { User } from '../models/User';
import api from './api';

export async function getUsers(term: string = ''): Promise<User[]> {
  try {
    const response = await api.post('/usuario/pesquisar', {
      termo: term,
    });
    return response.data;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to search contacts');
  }
}

export async function getUserById(userId: number): Promise<any> {
  try {
    const response = await api.get('/usuario/buscar/' + userId);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar contatos:', error);
    throw new Error('Failed to load contacts');
  }
}

export async function updatePassword(data: any): Promise<any> {
  try {
    const response = await api.post('/usuario/alterarSenha', data);
    return response;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to search contacts');
  }
}

export async function updateCurrentUser(updatedUser: User): Promise<any> {
  try {
    const response = await api.put('/usuario/atualizar', {
      ...updatedUser,
    });
    return response;
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    throw new Error('Failed to search contacts');
  }
}

export async function updateUser(data: any): Promise<any> {
  try {
    const response = await api.post(`/usuario/salvar`, data);
    return response;
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    throw new Error('Failed to save contact');
  }
}

export async function userIsAdmin(userId: number): Promise<boolean> {
  try {
    const response = await api.get('/usuario/buscar/' + userId);
    return response.data.object.tipos.includes('ROLE_ADMIN');
  } catch (error) {
    console.error('Erro ao carregar contatos:', error);
    throw new Error('Failed to load contacts');
  }
}
