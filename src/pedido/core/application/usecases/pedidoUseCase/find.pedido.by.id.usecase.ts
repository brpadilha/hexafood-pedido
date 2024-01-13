import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { PedidoException } from '../../exceptions/pedido.exception';
import { Inject } from '@nestjs/common';

export class FindPedidoByIdUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
    ) {}
    
    findById(id: number) {
      const pedido = this.pedidosRepository.findById(id);
      if (!pedido) {
        throw new PedidoException('Pedido não encontrado.');
      }  
      return pedido;  
  }
}