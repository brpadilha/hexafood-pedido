import { OnEvent } from '@nestjs/event-emitter';
import { UpdatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/update.pagamento.usecase';
import { CreatePagamentoDto } from 'src/pagamento/core/application/usecases/pagamento/pagamentoDto';

export class PagamentoProcessado {
  constructor(
    private updatePagamentoUseCase: UpdatePagamentoUseCase,
  ) {}

  @OnEvent('pagamento.processado')
  async handle(event: CreatePagamentoDto) {

    const {status, id_pedido} = event;
    const pagamento = await this.updatePagamentoUseCase.execute(
      {
        id: event.id,
        status: status,
        id_pedido
      }
    );

    return pagamento
  }

}