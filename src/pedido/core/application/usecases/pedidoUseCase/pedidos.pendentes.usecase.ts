import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";
import { Inject } from '@nestjs/common';
import { StatusPedido } from "src/pedido/core/domain/enum/status-pedido.enum";
import { OutputPedidoDTO } from "./pedido.dto";

export class PedidosPendentesUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
    ) {}
  
async execute(): Promise<OutputPedidoDTO[]> {
    return await this.pedidosRepository.findAll(StatusPedido.RECEBIDO);
  }
}
