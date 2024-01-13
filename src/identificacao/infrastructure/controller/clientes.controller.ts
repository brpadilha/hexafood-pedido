import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/create.cliente.usecase';
import { IndentifyClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/identify.cliente.usecase';
import { InputClienteDto } from '../../core/application/usecases/cliente/cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly identiyClienteUseCase: IndentifyClienteUseCase,
  ) {}

  @Post()
  create(@Body() cliente: InputClienteDto) {
    return this.createClienteUseCase.execute(cliente);
  }

  @Get(':cpf')
  async findByCPF(@Param('cpf') cpf: string): Promise<InputClienteDto | null> {
    return await this.identiyClienteUseCase.execute(cpf);
  }
}
