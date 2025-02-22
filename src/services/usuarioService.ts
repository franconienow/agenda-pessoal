import type { Usuario } from "../models/Usuario";
import api from "./api";

export async function getUsuarios(term: string = ""): Promise<Usuario[]> {
  try {
    const response = await api.post("/usuario/pesquisar", {
      termo: term,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    throw new Error("Failed to search contacts");
  }
}

export async function getUsuarioById(usuarioId: number): Promise<any> {
  try {
    const response = await api.get("/usuario/buscar/" + usuarioId);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar contatos:", error);
    throw new Error("Failed to load contacts");
  }
}

export async function updateSenha(data: any): Promise<any> {
  try {
    const response = await api.post("/usuario/alterarSenha", { ...data });
    return response.data;
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    throw new Error("Failed to search contacts");
  }
}

export async function updateUsuarioLogado(
  usuarioAtualizado: Usuario
): Promise<Usuario> {
  try {
    const response = await api.put("/usuario/atualizar", {
      ...usuarioAtualizado,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    throw new Error("Failed to search contacts");
  }
}

export async function removeContato(contatoId: number): Promise<any> {
  try {
    await api.delete("/contato/remover/" + contatoId);
  } catch (error) {
    console.error("Erro ao remover contato:", error);
    throw new Error("Failed to remove contact");
  }
}

export async function salvarUsuario(data: any): Promise<any> {
  try {
    const response = await api.post(`/usuario/salvar`, { ...data });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    throw new Error("Failed to save contact");
  }
}
