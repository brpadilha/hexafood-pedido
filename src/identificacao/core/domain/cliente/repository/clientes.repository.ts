import { Cliente } from '../entity/cliente.entity';

export const IClientesRepository = 'IClientesRepository';

export interface IClientesRepository {
  create(data: Cliente);

  findUnique(cpf: string): Promise<Cliente>;

  existsByCpf(cpf: string): Promise<boolean>;

  findById(id: number): Promise<Cliente>;
}
