import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InputCategoriaDto } from '../../../../src/pedido/core/application/usecases/categoriaUseCases/categoria.dto';
import { CreateCategoriaUseCase } from 'src/pedido/core/application/usecases/categoriaUseCases/create.categoria.usecase';
import { FindAllCategoriaUseCase } from 'src/pedido/core/application/usecases/categoriaUseCases/find.all.categoria.usecase';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly findAllCategoriaUseCase: FindAllCategoriaUseCase,
    private readonly createCategoriaUseCase: CreateCategoriaUseCase,
  ) {}

  @Get()
  findAll() {
    return this.findAllCategoriaUseCase.execute();
  }

  @Post()
  create(@Body() createCategoriaDto: InputCategoriaDto) {
    return this.createCategoriaUseCase.execute(createCategoriaDto);
  }
}
