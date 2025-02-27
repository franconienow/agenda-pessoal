import type { Person } from './Person';
import type { User } from './User';

export interface Contact {
  id?: number;
  email?: string;
  telefone?: string;
  tag: string;
  tipoContato?: string;
  privado: boolean;
  pessoa?: Person;
  usuario?: User;
  favorite?: boolean;
}
