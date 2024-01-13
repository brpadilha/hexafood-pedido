import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import { IdentificacaoModule } from './identificacao/identificacao.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    IdentificacaoModule,
    PedidoModule,
    PagamentoModule,
  ],
})
export class AppModule {}
