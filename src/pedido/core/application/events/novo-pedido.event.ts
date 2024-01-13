import { Pedido } from '../../domain/entity/pedido.entity';

export class NovoPedidoEvent {
  constructor(public pedido: Pedido) {}
}

