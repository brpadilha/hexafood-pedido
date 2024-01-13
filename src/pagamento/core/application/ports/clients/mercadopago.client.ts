import { Inject, Injectable } from '@nestjs/common';
import {
  IPagamentosRepository,
  PAGAMENTOS_REPOSITORY,
} from '../../../domain/pagamento/repository/pagamentos.repository';

import mercadopago from '../../../../../mocks/mercadoPagoMockService';
import {
  CreatePagamentoDto, OutPutPagamentoDto,
} from '../../usecases/pagamento/pagamentoDto';
import { Pagamento } from 'src/pagamento/core/domain/pagamento/entity/pagamento.entity';

export const MERCADO_PAGO_CLIENT = 'MercadoPagoClient';

@Injectable()
export class MercadoPagoClient implements IPagamentosRepository {
  constructor(
    @Inject(PAGAMENTOS_REPOSITORY)
    private pagamentosRepository: IPagamentosRepository,
  ) {
    mercadopago.configurations.setAccessToken('some-access-token');
  }

  async createPagamento({ valor, id_pedido, cliente }: CreatePagamentoDto) {
    const descricao = `Hexafood - pedido ${id_pedido} - MercadoPago`;
    const { nome, cpf } = cliente;
    const nameParts = nome.split(' ');

    const payer =
      (nome) || cpf
        ? {
            ...(cpf &&
              ({ identification: { type: 'CPF', number: cpf } } as const)),
            ...(nome && {
              first_name: nameParts[0],
              last_name:
                nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
            }),
          }
        : null;

    const transaction = await mercadopago.payment.create({
      transaction_amount: valor,
      description: descricao,
      payment_method_id: 'pix',
      ...(payer && { payer }),
    });

    return this.pagamentosRepository.createPagamento(new Pagamento(
      cliente.id,
      id_pedido,
      transaction.id,
      descricao,
      'MercadoPago',
      valor,
      transaction.status,
    ));

  }

  findAll(): Promise<Pagamento[]> {
    return this.pagamentosRepository.findAll();
  }

  findById(id: number): Promise<OutPutPagamentoDto> {
    return this.pagamentosRepository.findById(id);
  }
  remove(id: number) {
    return this.pagamentosRepository.remove(id);
  }

  update(id: number, status: string) {
    return this.pagamentosRepository.update(id, status);
  }
}
