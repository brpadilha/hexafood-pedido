import { IProdutosRepository } from '../../../domain/repository/produtos.repository';
import { ProdutoException } from '../../exceptions/produto.exception';

export class FindByIdProdutoUseCase {
  constructor(private produtosRepository: IProdutosRepository) {}

  async execute(id: number) {
    const produto = await this.produtosRepository.findById(id);
    if (!produto) {
      throw new ProdutoException('O produto informado não existe.');
    }
    return produto;
  }
}


