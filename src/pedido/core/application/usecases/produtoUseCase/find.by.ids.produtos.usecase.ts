import { IProdutosRepository } from '../../../domain/repository/produtos.repository';
import { ProdutoException } from '../../exceptions/produto.exception';
import { Inject } from '@nestjs/common';

export class FindByIdsProdutosUseCase {
  constructor(
    @Inject('IProdutosRepository')
        private produtosRepository: IProdutosRepository) {}

  async execute(ids: number[]) {
    const produto = await this.produtosRepository.findByIds(ids);
    if (!produto) {
      throw new ProdutoException('O produto informado não existe.');
    }
    return produto;
  }
}


