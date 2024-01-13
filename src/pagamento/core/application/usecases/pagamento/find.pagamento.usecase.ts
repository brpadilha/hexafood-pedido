
import { Inject } from '@nestjs/common';
import { IPagamentosRepository, PAGAMENTOS_REPOSITORY } from 'src/pagamento/core/domain/pagamento/repository/pagamentos.repository';

export class FindPagamentoUseCase {
  constructor(
    @Inject(PAGAMENTOS_REPOSITORY)
    private pagamentosRepository: IPagamentosRepository

  ) {}


  async execute(id: number) {
    return this.pagamentosRepository.findById(id);
  }

}