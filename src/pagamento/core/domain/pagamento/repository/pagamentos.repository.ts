import { OutPutPagamentoDto } from 'src/pagamento/core/application/usecases/pagamento/pagamentoDto';
import { Pagamento } from '../entity/pagamento.entity';

export const PAGAMENTOS_REPOSITORY = 'IPagamentosRepository';
export interface IPagamentosRepository {
  createPagamento(data: Pagamento);

  findById(id: number): Promise<OutPutPagamentoDto>;

  findAll(): Promise<Pagamento[]>;

  remove(id: number): Promise<unknown>;

  update(id:number,status: string): Promise<unknown>;
}
