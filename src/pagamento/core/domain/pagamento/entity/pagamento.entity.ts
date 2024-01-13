import { PagamentosException } from 'src/pagamento/core/application/exceptions/pagamentos.exception';
import { Cliente } from '../../../../../identificacao/core/domain/cliente/entity/cliente.entity';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';

export class Pagamento {
  id?: number;
  id_cliente?: number;
  id_pedido: number;
  id_transacao: number;
  descricao: string;
  plataforma: string;
  valor: number;
  updatedAt?: Date;
  createdAt?: Date;
  cliente?: Cliente;
  pedido?: Pedido;
  status: string;

  constructor(id_cliente: number, id_pedido: number, id_transacao: number, descricao: string, plataforma: string, valor: number, status: string) {
    this.id_cliente = id_cliente;
    this.id_pedido = id_pedido;
    this.id_transacao = id_transacao;
    this.descricao = descricao;
    this.plataforma = plataforma;
    this.valor = valor;
    this.status = status;
    this.validate();
  }

  validate() {
    if (!this.id_pedido) {
      throw new PagamentosException('O id_pedido não pode ser vazio');
    }
    if (!this.id_transacao) {
      throw new PagamentosException('O id_transacao não pode ser vazio');
    }
    if (!this.descricao) {
      throw new PagamentosException('O descricao não pode ser vazio');
    }
    if (!this.plataforma) {
      throw new PagamentosException('O plataforma não pode ser vazio');
    }
    if (!this.valor) {
      throw new PagamentosException('O valor não pode ser vazio');
    }
    if (!this.status) {
      throw new PagamentosException('O status não pode ser vazio');
    }

  }
  
}


