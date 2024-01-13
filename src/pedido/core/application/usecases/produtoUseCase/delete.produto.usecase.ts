import { IProdutosRepository } from 'src/pedido/core/domain/repository/produtos.repository';
import { ExistProdutoUseCase } from './exist.produto.usecase';
import { Inject } from '@nestjs/common';

export class DeleteProdutoUseCase {
  constructor(
    @Inject(IProdutosRepository)
    private produtosRepository: IProdutosRepository, 
    private readonly existProdutoUseCase: ExistProdutoUseCase) 
  {}

  async execute(id: number) {
    if (this.existProdutoUseCase.execute(id))
      return this.produtosRepository.remove(id);
  }
}

  