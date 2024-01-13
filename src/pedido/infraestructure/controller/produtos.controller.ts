import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { Produto } from '../../core/domain/entity/produto.entity';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { FindAllProdutosUseCase } from 'src/pedido/core/application/usecases/produtoUseCase/find.all.produtos.usecase';
import { FindByIdCategoriaUseCase } from 'src/pedido/core/application/usecases/categoriaUseCases/find.by.categoria.produto.usecase';
import { UpdateProdutoUseCase } from 'src/pedido/core/application/usecases/produtoUseCase/update.produto.usecase';
import { DeleteProdutoUseCase } from 'src/pedido/core/application/usecases/produtoUseCase/delete.produto.usecase';
import { InputProdutoDto } from 'src/pedido/core/application/usecases/produtoUseCase/produto.dto';
import { CreateProdutoUseCase } from 'src/pedido/core/application/usecases/produtoUseCase/create.produto.usecase';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly createProdutoUseCase: CreateProdutoUseCase,
    private readonly findAllProdutosUseCase: FindAllProdutosUseCase,
    private readonly findByIdCategoriaUseCase: FindByIdCategoriaUseCase,
    private readonly updateProdutoUseCase: UpdateProdutoUseCase,
    private readonly deleteProdutoUseCase: DeleteProdutoUseCase,
  ) {}

  @Post()
  @ApiBody({ type: [InputProdutoDto] })
  createManyProdutos(@Body() produto: InputProdutoDto[]) {
    return this.createProdutoUseCase.execute(produto);
  }

  @Get()
  findAll() {
    return this.findAllProdutosUseCase.execute();
  }

  @Get(':id_categoria')
  async findByIdCategoria(
    @Param('id_categoria') id_categoria: number,
  ): Promise<Produto[] | null> {
    return await this.findByIdCategoriaUseCase.execute(id_categoria);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() produto: InputProdutoDto) {
    return this.updateProdutoUseCase.execute(+id, produto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProdutoUseCase.execute(+id);
  }
}
