import { Inject, Injectable } from '@nestjs/common';
import { NovoPedidoEvent } from '../../../core/application/events/novo-pedido.event';
import { OnEvent } from '@nestjs/event-emitter';
import { StatusPedido } from '../../../core/domain/enum/status-pedido.enum';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { UpdatePedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase';

@Injectable()
export class NovoPedidoListener {
  constructor(
    private createPagamentoUseCase: CreatePagamentoUseCase,
  ) {}

  @OnEvent('novo.pedido')
  async handle(event: NovoPedidoEvent) {
    const pedido = event.pedido;
    const pagamentoDto = {
      valor: pedido.valor_total,
      id_pedido: pedido.id,
      cliente: null,
    };

    if (pedido.cliente) {
      pagamentoDto.cliente = {
        id: pedido.cliente.id,
        nome: pedido.cliente.nome,
        cpf: pedido.cliente.cpf,
      };
    }
      return this.createPagamentoUseCase.execute(
          pagamentoDto,
        );
  }
}
