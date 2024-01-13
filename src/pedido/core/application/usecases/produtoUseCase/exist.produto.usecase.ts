import { IProdutosRepository } from 'src/pedido/core/domain/repository/produtos.repository';
import { Inject } from '@nestjs/common';

export class ExistProdutoUseCase {
  constructor(
    @Inject(IProdutosRepository)
    private produtosRepository: IProdutosRepository,
  ) {}
  async execute(id: number) {
    const produto = await this.produtosRepository.findById(id);
    if (!produto) {
      return false;
    }
    return true;
  }
}
