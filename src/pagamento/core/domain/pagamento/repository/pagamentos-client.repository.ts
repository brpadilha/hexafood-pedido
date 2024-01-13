import { CreatePagamentoDto } from '../../../application/usecases/pagamento/pagamentoDto';

export interface IPagamentosClientRepository<T = { id: bigint }> {
  createPagamento(data: CreatePagamentoDto): T;
}
