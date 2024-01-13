import { Cliente } from '../../../../identificacao/core/domain/cliente/entity/cliente.entity';
import { StatusPedido } from '../enum/status-pedido.enum';
import { Produto } from './produto.entity';

export class Pedido {
  id: number;
  codigo_pedido: string;
  valor_total: number;
  status: StatusPedido;
  createdAt?: Date;
  updatedAt?: Date;
  id_cliente?: number;
  cliente?: Cliente;
  itens: Item[];

  constructor() {
    this.codigo_pedido = this.generateRandomCode();
    this.status = StatusPedido.INICIADO;
  }

  //Gera um código randômico de 6 dígitos
  private generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}

export class Item {
  id?: number;
  // numero_item: number;
  quantidade: number;
  valor: number;
  id_produto: number;
  produto?: Produto;
}
