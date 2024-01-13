import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";
import { Pedido } from "src/pedido/core/domain/entity/pedido.entity";
import { StatusPedido } from "src/pedido/core/domain/enum/status-pedido.enum";
import { FindPedidoByIdUseCase } from "./find.pedido.by.id.usecase";
import { Inject } from '@nestjs/common';

export class FinalizarPedidoUseCase {
    constructor(
      @Inject('IPedidosRepository')
      private pedidosRepository: IPedidosRepository,
      private findPedidoByIdUseCase: FindPedidoByIdUseCase
    ) {}
  
async execute(id: number): Promise<Pedido> {
    const pedido = await this.findPedidoByIdUseCase.findById(id);
    
    pedido.status = StatusPedido.FINALIZADO;
    return this.pedidosRepository.update(id, pedido);
  }
}