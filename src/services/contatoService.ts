import type { Contato } from "../models/Contato";
import api from "./api";

export async function getContatos(term: string = ""): Promise<Contato[]> {
  try {
    const response = await api.post("/contato/pesquisar", {
      termo: term,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    throw new Error("Failed to search contacts");
  }
}

export async function getContatosByPessoa(
  pessoaId: number
): Promise<Contato[]> {
  try {
    const response = await api.get("/contato/listar/" + pessoaId);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar contatos:", error);
    throw new Error("Failed to load contacts");
  }
}

export async function getContatosFavoritos(): Promise<Contato[]> {
  try {
    const response = await api.get("/favorito/pesquisar");
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

export async function salvarContato(contato: Contato): Promise<any> {
  try {
    const response = await api.post(`/contato/salvar`, contato);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    throw new Error("Failed to save contact");
  }
}
