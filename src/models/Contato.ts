import type { Pessoa } from "./Pessoa";
import type { Usuario } from "./Usuario";

export interface Contato {
  id?: number;
  email?: string;
  telefone?: string;
  tag: string;
  tipoContato?: string;
  privado: boolean;
  pessoa: Pessoa;
  usuario: Usuario;
}
