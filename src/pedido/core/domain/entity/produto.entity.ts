import { ProdutoException } from "../../application/exceptions/produto.exception";

export class Produto {
  id?: number;
  nome: string;
  id_categoria: number;
  valor: number;
  descricao: string;
  imagem: string;
  createdAt?: Date;
  updatedAt?: Date;

  // constructor(nome: string, id_categoria: number, valor: number, descricao: string ) {
  //   this.nome = nome;
  //   this.id_categoria = id_categoria;
  //   this.valor = valor;
  //   this.descricao = descricao;
  //   this.validateProduto();
  // }

  // validateProduto() {
  //   if (!this.nome || this.nome.trim() === '') {
  //     throw new ProdutoException('O nome não pode ser vazio');
  //   }
  //   if (!this.id_categoria || this.id_categoria == 0 ) {
  //     throw new ProdutoException('Categoria não pode ser 0.');
  //   }
  //   if(!this.valor || this.valor == 0) {
  //     throw new ProdutoException('Valor não pode ser 0.');
  //   }
  //   if(!this.descricao || this.descricao.trim() === '') {
  //     throw new ProdutoException('Descrição do produto não pode ser vazia.');
  //   }
  // }

  // constructor( produtosDto: InputProdutoDto[] ) {
  //   this.validateProdutos(produtosDto);
  // }

  // validateProdutos(produtosDto: InputProdutoDto[]) {
  //   if (produtosDto.some(
  //       (produto) => !produto || Object.values(produto).some((value) => !value),
  //     )
  //   ) {
  //     throw new ProdutoException('Campo(s) não pode(m) ser vazio(s)');
  //   }
  // }
}
