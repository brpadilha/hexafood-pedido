import { PrismaClient } from '@prisma/client';
import { Produto } from '../../core/domain/entity/produto.entity';
import { IProdutosRepository } from 'src/pedido/core/domain/repository/produtos.repository';
import { InputProdutoDto } from 'src/pedido/core/application/usecases/produtoUseCase/produto.dto';

export class ProdutosRepository implements IProdutosRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, 
        },
      },
    });
  }

  async createManyProdutos(produtos: InputProdutoDto[]) {
    return this.prisma.produto.createMany({
      data: produtos,
    });
  }

  async findAll(): Promise<Produto[] | null> {
    var produtos = await this.prisma.produto.findMany();
    return produtos;
  };

  async findByIdCategoria(idCategoria: number) {
    return this.prisma.produto.findMany({
      where: {
        id_categoria: Number(idCategoria),
      },
    });
  }

  async update(id: number, produto: InputProdutoDto): Promise<Produto | null> {
    const item = this.prisma.produto.findUnique({
      where: { id },
    });

    return this.prisma.produto.update({
      where: {
        id,
      },
      data: {
        nome: produto.nome,
        valor: produto.valor,
        descricao: produto.descricao,
        imagem: produto.imagem,
        id_categoria: produto.id_categoria,
      },
    });
  }

  async remove(id: number): Promise<Produto | null> {
    return this.prisma.produto.delete({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: number[]): Promise<Produto[] | null> {
    return this.prisma.produto.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findById(id: number): Promise<Produto | null> {
    return this.prisma.produto.findUnique({
      where: { id },
    });
  }
}
