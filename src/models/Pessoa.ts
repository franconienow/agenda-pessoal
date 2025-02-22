import type { Endereco } from "./Endereco";
import type { Foto } from "./Foto";

export interface Pessoa {
  id?: number;
  nome: string;
  cpf: string;
  endereco: Endereco;
  Foto: Foto;
}
