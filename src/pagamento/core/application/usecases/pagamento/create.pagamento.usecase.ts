import { Inject } from '@nestjs/common';

import { MERCADO_PAGO_CLIENT } from '../../ports/clients/mercadopago.client';
import { IPagamentosClientRepository } from 'src/pagamento/core/domain/pagamento/repository/pagamentos-client.repository';
import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';
import { PagamentosException } from '../../exceptions/pagamentos.exception';
import { CreatePagamentoDto } from './pagamentoDto';
import { IPagamentosRepository, PAGAMENTOS_REPOSITORY } from 'src/pagamento/core/domain/pagamento/repository/pagamentos.repository';
import { Pagamento } from 'src/pagamento/core/domain/pagamento/entity/pagamento.entity';
import { IndentifyClienteUseCase } from '../../../../../identificacao/core/application/usecases/cliente/identify.cliente.usecase';
  
export class CreatePagamentoUseCase {
  constructor(
    @Inject(PAGAMENTOS_REPOSITORY)
    private pagamentosRepository: IPagamentosRepository,

    @Inject(MERCADO_PAGO_CLIENT)
    private pagamentosClient: IPagamentosClientRepository,
    private findPedidoByIdUseCase: FindPedidoByIdUseCase,
    private indentifyClienteUseCase: IndentifyClienteUseCase,
  ) {}

  async execute(data: CreatePagamentoDto) {
    const pedido = await this.findPedidoByIdUseCase.findById(data.id_pedido);
    if (!pedido) {
      throw new PagamentosException('O Pedido informado não existe.');
    }

    var cpf = this.getCpf( data);

    if(!cpf){
        return new PagamentosException("Não foi possível processar o pagamento");
    }
    const cliente = await this.indentifyClienteUseCase.execute(cpf);

    return this.pagamentosClient.createPagamento({ ...data, cliente,  status: 'pendente'});
  }


  private getCpf(data: CreatePagamentoDto): string {
    if (data.cliente && data.cliente.cpf !== null) {
      return data.cliente.cpf;
    } else if (data.cpf !== null) {
      return data.cpf;
    } else {
      return null;
    }  
  }
}
