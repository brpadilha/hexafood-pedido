import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";
import { Inject } from '@nestjs/common';
import { Pedido } from "src/pedido/core/domain/entity/pedido.entity";

export class UpdatePedidoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
    ) {}
  
async execute(pedido : Pedido) {
    await this.pedidosRepository.update(pedido.id, pedido);
    }
}
