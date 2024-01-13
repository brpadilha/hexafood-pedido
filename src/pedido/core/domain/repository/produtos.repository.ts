import { Produto } from "src/pedido/core/domain/entity/produto.entity";
import { InputProdutoDto } from "../../application/usecases/produtoUseCase/produto.dto";

export const IProdutosRepository = 'IProdutosRepository';

export interface IProdutosRepository {
  createManyProdutos(data: InputProdutoDto[]);

  findAll(): Promise<Produto[]>;

  findByIdCategoria(id_categoria: number): Promise<Produto[]>;

  update(id: number, produto: InputProdutoDto);

  remove(id: number);

  findByIds(ids: number[]);

  findById(id: number);

}
