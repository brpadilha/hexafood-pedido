import { Inject } from '@nestjs/common';

import { PagamentosException } from '../../exceptions/pagamentos.exception';
import { PagamentoDto, UpdatePagamentoDto } from './pagamentoDto';
import { IPagamentosRepository, PAGAMENTOS_REPOSITORY } from 'src/pagamento/core/domain/pagamento/repository/pagamentos.repository';
import { UpdatePedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase';
import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';


export class UpdatePagamentoUseCase {
  constructor(
    @Inject(
      UpdatePedidoUseCase
    )
    private updatePedidoUseCase: UpdatePedidoUseCase,

    @Inject(
      FindPedidoByIdUseCase
    )
    private findPedidoByIdUseCase: FindPedidoByIdUseCase,

    @Inject(PAGAMENTOS_REPOSITORY)
    private pagamentosRepository: IPagamentosRepository,

  ) { }

  async execute(data: UpdatePagamentoDto) {
    const { status,  id } = data

    const pagamento = await this.pagamentosRepository.findById(+id);

    const pedido = await this.findPedidoByIdUseCase.findById(pagamento.id_pedido)
 
    if(status === 'APROVADO'){
      pedido.status = StatusPedido.RECEBIDO
      await this.updatePedidoUseCase.execute(pedido);
    }else{
      pedido.status = StatusPedido.CANCELADO
      await this.updatePedidoUseCase.execute(pedido);
    }
    return this.pagamentosRepository.update(+id, status)
  }
}


