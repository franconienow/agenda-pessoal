import type { Address } from './Address';
import type { Photo } from './Photo';

export interface Person {
  id?: number;
  nome: string;
  cpf: string;
  endereco: Address;
  foto?: Photo;
}
