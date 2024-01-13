
import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";
import { Inject } from '@nestjs/common';
import { PedidoException } from "../../exceptions/pedido.exception";

export class FindPedidoByCodigoUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
    ) {}
  
async execute(codigo_pedido: string) {
    const pedido = this.pedidosRepository.findByCodigo(codigo_pedido);
    if(!pedido){
        throw new PedidoException("Código de pedido não encontrado.");
    }
    return pedido;
  }
}