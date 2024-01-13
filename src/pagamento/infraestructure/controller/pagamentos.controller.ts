import { Body, Controller, Patch, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import EventEmitter from 'events';
import { Inject } from '@nestjs/common';
import { CreatePagamentoDto, UpdatePagamentoDto } from '../../core/application/usecases/pagamento/pagamentoDto';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { FindPagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/find.pagamento.usecase';
import { UpdatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/update.pagamento.usecase';
import { PagamentoProcessadoEvent } from 'src/pagamento/core/application/events/pagamento.processado.event';

@ApiTags('pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(
    private readonly createPagamentoUseCase: CreatePagamentoUseCase,
    private readonly findPagamentoUseCase: FindPagamentoUseCase,
    private readonly updatePagamentoUseCase: UpdatePagamentoUseCase,

    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}
  
  @Post()
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.createPagamentoUseCase.execute(createPagamentoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findPagamentoUseCase.execute(Number(id));
  }

  @Patch()
  async update(@Body() updatePagamentoDto: UpdatePagamentoDto) {
    const pagamento = await this.findPagamentoUseCase.execute(updatePagamentoDto.id);
    pagamento.status = updatePagamentoDto.status;
    
    this.eventEmitter.emit('pagamento.processado', new PagamentoProcessadoEvent(pagamento));
    return null
  }



}
