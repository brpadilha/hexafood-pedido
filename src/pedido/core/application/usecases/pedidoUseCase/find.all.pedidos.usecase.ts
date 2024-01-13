import { IPedidosRepository } from "src/pedido/core/domain/repository/pedidos.repository";
import { InputPedidoDTO } from "./pedido.dto"
import { Inject } from '@nestjs/common';
import { PedidoException } from "../../exceptions/pedido.exception";

export class FindAllPedidosUseCase {
    constructor(
      @Inject(IPedidosRepository)
      private pedidosRepository: IPedidosRepository,
    ) {}
  
async execute(): Promise<InputPedidoDTO[]> {
    const pedidos = await this.pedidosRepository.findAll();
    if (!pedidos) {
      throw new PedidoException('Não há nenhum pedido realizado.');
    }

    return pedidos.map((pedido) => ({
      id: pedido.id,
      id_cliente: pedido.id_cliente,
      status: pedido.status.toString(),
      valor_total: pedido.valor_total,
      itens: pedido.itens.map((item) => ({
        quantidade: item.quantidade,
        valor: item.valor,
        id_produto: item.id_produto,
      })),
    }));
  }
}
