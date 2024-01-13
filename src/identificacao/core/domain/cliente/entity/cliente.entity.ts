import { ClienteException } from 'src/identificacao/core/application/exceptions/cliente.exception';

export class Cliente {
  id?: number;

  nome: string;

  cpf: string;

  createdAt?: Date;

  constructor(nome: string, cpf: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.validate();
  }

  validate() {
    if (!this.nome || this.nome.trim() === '') {
      throw new ClienteException('O nome não pode ser vazio');
    }
    if (this.cpf.length !== 11) {
      throw new ClienteException('CPF do cliente deve ter 11 caracteres');
    }
  }
}
