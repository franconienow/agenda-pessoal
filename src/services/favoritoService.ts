import type { Contato } from "../models/Contato";
import api from "./api";

export async function getFavoritos(): Promise<Contato[]> {
  try {
    const response = await api.get("/favorito/pesquisar");
    return response.data;
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    throw new Error("Failed to search contacts");
  }
}

export async function removeFavorito(contatoId: number): Promise<any> {
  try {
    await api.delete("/favorito/remover/" + contatoId);
  } catch (error) {
    console.error("Erro ao remover contato:", error);
    throw new Error("Failed to remove contact");
  }
}

export async function salvarFavorito(contato: Contato): Promise<any> {
  try {
    const response = await api.post(`/favorito/salvar`, contato);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    throw new Error("Failed to save contact");
  }
}
