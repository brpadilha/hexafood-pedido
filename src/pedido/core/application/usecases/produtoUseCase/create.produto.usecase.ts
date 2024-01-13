
import { IProdutosRepository } from "src/pedido/core/domain/repository/produtos.repository";
import { ProdutoException } from "../../exceptions/produto.exception";
import { FindAllCategoriaUseCase } from "../categoriaUseCases/find.all.categoria.usecase";
import { InputProdutoDto } from "./produto.dto";
import { Inject } from '@nestjs/common';

export class CreateProdutoUseCase {
    constructor(
      @Inject(IProdutosRepository)
      private produtosRepository: IProdutosRepository,
      private findAllCategoriaUseCase: FindAllCategoriaUseCase,

    ) {}
  
    async execute(produtosDto: InputProdutoDto[]) {
      
      const produtos: InputProdutoDto[] = await this.validarCamposProduto(produtosDto);
      
      return this.produtosRepository.createManyProdutos(produtosDto);
    }

    private async validarCamposProduto(produtos: InputProdutoDto[]): Promise<InputProdutoDto[]> {
        if (
          produtos.some(
            (produto) => !produto || Object.values(produto).some((value) => !value),
          )
        ) {
          throw new ProdutoException('Campo(s) não pode(m) ser vazio(s)');
        }
        
        const categorias = await this.findAllCategoriaUseCase.execute();
        const categoriaIds = categorias.map((categoria) => categoria.id);
        for (const produto of produtos) {
          if (!categoriaIds.includes(produto.id_categoria)) {
            throw new ProdutoException('A categoria informada não existe');
          }
        }    
        return produtos;
    }
}

