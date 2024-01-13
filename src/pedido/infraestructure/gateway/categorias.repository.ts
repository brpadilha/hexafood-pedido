import { PrismaClient } from '@prisma/client';
import { InputCategoriaDto, OutputCategoriaDto} from 'src/pedido/core/application/usecases/categoriaUseCases/categoria.dto';
import { Categoria } from 'src/pedido/core/domain/entity/categoria.entity';
import { ICategoriasRepository } from 'src/pedido/core/domain/repository/categorias.repository';

export class CategoriasRepository implements ICategoriasRepository {
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
  async create(createCategoriaDto: InputCategoriaDto): Promise<OutputCategoriaDto>{
    return this.prisma.categoria.create({
      data: {
        nome: createCategoriaDto.nome
      },
    })
  };

  // async findOne(id : number): Promise<Categoria | null> {
  //   return this.prisma.categoria.findUnique({
  //     where: { id },
  //   });
  // };

  async findAll(): Promise<OutputCategoriaDto[] | null> {
    var categorias = await this.prisma.categoria.findMany();
    return categorias;
  };

  // async update(id: number, updateCategoriaDto: InputCategoriaDto): Promise<Categoria | null> {
  //   var item = this.prisma.categoria.findUnique({
  //     where: { id },
  //   });

  //   return this.prisma.categoria.update(
  //     {
  //       where: {
  //         id
  //       },
  //       data: {
  //         nome: updateCategoriaDto.name,
  //       },
  //     }
  //   )
  // };

  // async remove(id: number): Promise<Categoria | null> {
  //   return this.prisma.categoria.delete({
  //     where: {
  //       id
  //     },
  //   })
  // };
  
  async existsByName(nome: string): Promise<boolean> {
    const exist = await this.prisma.categoria.count({
      where: { nome : nome },
    });
    return exist > 0;
  }

}



