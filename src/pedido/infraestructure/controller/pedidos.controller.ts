import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import { ApiTags, ApiBody } from '@nestjs/swagger';
import { InputPedidoDTO, OutputPedidoDTO } from 'src/pedido/core/application/usecases/pedidoUseCase/pedido.dto';
import { CreatePedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/create.pedido.usecase';
import { FindAllPedidosUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.all.pedidos.usecase';
import { PedidosPendentesUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/pedidos.pendentes.usecase';
import { IniciarPreparacaoPedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { FinalizarPreparacaoPedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { FinalizarPedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/finalizar.pedido.usecase';
import { FindPedidoByCodigoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.codigo.usecase';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(
    private readonly createPedidoUseCase: CreatePedidoUseCase,
    private readonly findAllPedidosUseCase: FindAllPedidosUseCase,
    private readonly pedidosPendentesUseCase: PedidosPendentesUseCase,
    private readonly iniciarPreparacaoPedidoUseCase: IniciarPreparacaoPedidoUseCase,
    private readonly finalizarPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase,
    private readonly finalizarPedidoUseCase: FinalizarPedidoUseCase,
    private readonly findPedidoByCodigoUseCase: FindPedidoByCodigoUseCase
  ) {}

  @Post()
  @ApiBody({ type: InputPedidoDTO })
  createPedido(@Body() pedido: InputPedidoDTO) {
    return this.createPedidoUseCase.execute(pedido);
  }

  @Get()
  async findAll(): Promise<OutputPedidoDTO[] | null> {
    return this.findAllPedidosUseCase.execute();
  }

  @Get('/consultar_pedidos_pendentes')
  async consultarPedidosPendentes(): Promise<OutputPedidoDTO[] | null> {
    return this.pedidosPendentesUseCase.execute();
  }

  @Patch(':id/iniciar_preparacao')
  async iniciarPreparacaoPedido(@Param('id') id: number) {

    return this.iniciarPreparacaoPedidoUseCase.execute(Number(id));
  }

  @Patch(':id/finalizar_preparacao')
  async finalizarPreparacaoPedido(@Param('id') id: number) {

    return this.finalizarPreparacaoPedidoUseCase.execute(Number(id));
  }

  @Patch(':id/finalizar_pedido')
  async finalizarPedido(@Param('id') id: number) {

    return this.finalizarPedidoUseCase.execute(Number(id));
  }

  @Get(':codigo_pedido')
  async consultarPedidoPorCodigo(@Param('codigo_pedido') codigo_pedido: string) {
    return this.findPedidoByCodigoUseCase.execute(codigo_pedido);
  }

}
