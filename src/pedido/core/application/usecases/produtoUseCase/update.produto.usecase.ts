import { IProdutosRepository } from 'src/pedido/core/domain/repository/produtos.repository';
import { ExistProdutoUseCase } from './exist.produto.usecase';
import { InputProdutoDto } from './produto.dto';
import { Inject } from '@nestjs/common';
import { ProdutoException } from '../../exceptions/produto.exception';

export class UpdateProdutoUseCase {
  constructor(
    @Inject(IProdutosRepository)
    private produtosRepository: IProdutosRepository, 
    @Inject(ExistProdutoUseCase)
    private readonly existProdutoUseCase: ExistProdutoUseCase) 
  {}

  async execute(id: number, produtoDto: InputProdutoDto) {
    const produtoExists = await this.existProdutoUseCase.execute(id);
    if (!produtoExists){
      return new ProdutoException('Produto não encontrado');
    }
    return this.produtosRepository.update(id, produtoDto);
  }
}

  