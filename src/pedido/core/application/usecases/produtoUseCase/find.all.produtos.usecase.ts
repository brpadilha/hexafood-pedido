import { ProdutoException } from "../../exceptions/produto.exception";
import { IProdutosRepository } from "src/pedido/core/domain/repository/produtos.repository";
import { Inject } from '@nestjs/common';

export class FindAllProdutosUseCase {
  constructor(
    @Inject(IProdutosRepository)
    private produtosRepository: IProdutosRepository) {}

  async execute() {
    const produtos =  this.produtosRepository.findAll();
    if (!produtos) {
      throw new ProdutoException('Não há produtos cadastrados.');
    }
    return produtos;
  }
}
