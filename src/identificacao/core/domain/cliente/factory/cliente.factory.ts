import { Cliente } from '../entity/cliente.entity';

export class ClienteFactory {
  static create(data: any): Cliente {
    const cliente = new Cliente(data.nome, data.cpf);
    cliente.id = data.id || null;
    cliente.createdAt = data.createdAt || null;
    return cliente;
  }
}
