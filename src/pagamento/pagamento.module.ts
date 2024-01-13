import { forwardRef, Module } from '@nestjs/common';
import { PagamentosController } from './infraestructure/controller/pagamentos.controller';
import { PAGAMENTOS_REPOSITORY } from './core/domain/pagamento/repository/pagamentos.repository';
import {
  MERCADO_PAGO_CLIENT,
  MercadoPagoClient,
} from './core/application/ports/clients/mercadopago.client';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ValidationFilter } from './infraestructure/filter/validation.filter';
import { APP_FILTER } from '@nestjs/core';
import { IdentificacaoModule } from 'src/identificacao/identificacao.module';
import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';
import { CreatePagamentoUseCase } from './core/application/usecases/pagamento/create.pagamento.usecase';
import { PagamentosRepository } from './infraestructure/gateway/pagamentos.repository';
import { UpdatePedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/update.pedido.usecase';
import { FindPagamentoUseCase } from './core/application/usecases/pagamento/find.pagamento.usecase';
import { UpdatePagamentoUseCase } from './core/application/usecases/pagamento/update.pagamento.usecase';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [ forwardRef(() => PedidoModule), forwardRef(() => IdentificacaoModule)],
  controllers: [PagamentosController],
  providers: [
    { provide: PAGAMENTOS_REPOSITORY, useClass: PagamentosRepository },
    { provide: MERCADO_PAGO_CLIENT, useClass: MercadoPagoClient },
    { provide: APP_FILTER, useClass: ValidationFilter },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
    {
      provide: FindPedidoByIdUseCase,
      useClass: FindPedidoByIdUseCase,
    },
    {
      provide: UpdatePedidoUseCase,
      useClass: UpdatePedidoUseCase,
    },
    CreatePagamentoUseCase,
    FindPagamentoUseCase,
    UpdatePagamentoUseCase,
  ],
  exports: [CreatePagamentoUseCase, PAGAMENTOS_REPOSITORY, MERCADO_PAGO_CLIENT], // Exportando o serviço para uso em outros módulos
})
export class PagamentoModule {}
