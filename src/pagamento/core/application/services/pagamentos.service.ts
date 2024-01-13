// import { Inject, Injectable } from '@nestjs/common';
// import {
//   IPagamentosRepository,
//   PAGAMENTOS_REPOSITORY,
// } from '../../domain/pagamento/repository/pagamentos.repository';

// import { CreatePagamentoDto } from '../usecases/pagamento/pagamentoDto';
// import { MERCADO_PAGO_CLIENT } from '../ports/clients/mercadopago.client';
// import { PagamentosException } from '../exceptions/pagamentos.exception';
// import { Pagamento } from '../../domain/pagamento/entity/pagamento.entity';
// import { IPagamentosClientRepository } from '../../domain/pagamento/repository/pagamentos-client.repository';
// import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';

// @Injectable()
// export class PagamentosService {
//   constructor(
//     @Inject(PAGAMENTOS_REPOSITORY)
//     private pagamentosRepository: IPagamentosRepository,

//     @Inject(MERCADO_PAGO_CLIENT)
//     private pagamentosClient: IPagamentosClientRepository,
//     private findPedidoByIdUseCase: FindPedidoByIdUseCase 
//     ) {  }

//   async createPagamento(data: CreatePagamentoDto) {
//     const description = `Hexafood - pedido ${data.id_pedido} - MercadoPago`;
//     const pedido = await this.findPedidoByIdUseCase.findById(data.id_pedido);
//     if (!pedido) {
//       throw new PagamentosException('O Pedido informado não existe.');
//     }

//     const { id } = await this.pagamentosClient.createPagamento(data);

//     return this.pagamentosRepository.createPagamento({
//       valor: data.valor,
//       id_pedido: data.id_pedido,
//       id_transacao: id,
//       plataforma: 'mercadopago',
//       descricao: description,
//     });
//   }

//   async findAll(): Promise<any[]> {
//     const pagamentos = await this.pagamentosRepository.findAll();

//     return pagamentos.map((pagamento) => ({
//       id: pagamento.id,
//       id_cliente: pagamento.id_cliente,
//       id_pedido: pagamento.id_pedido,
//       id_transacao: pagamento.id_transacao.toString(),
//       descricao: pagamento.descricao,
//       plataforma: pagamento.plataforma,
//       valor: pagamento.valor,
//       updatedAt: pagamento.updatedAt,
//       createdAt: pagamento.createdAt,
//       cliente: pagamento.cliente,
//       pedido: pagamento.pedido,
//     }));
//   }

//   async findById(id: number): Promise<Pagamento> {
//     const pagamento = await this.pagamentosRepository.findById(id);
//     console.log('pagamento', pagamento);

//     if (!pagamento) {
//       throw new PagamentosException('Pagamento não encontrado');
//     }
//     return {
//       id: pagamento.id,
//       id_cliente: pagamento.id_cliente,
//       id_pedido: pagamento.id_pedido,
//       id_transacao: BigInt(pagamento.id_transacao),
//       descricao: pagamento.descricao,
//       plataforma: pagamento.plataforma,
//       valor: pagamento.valor,
//       updatedAt: pagamento.updatedAt,
//       createdAt: pagamento.createdAt,
//       cliente: pagamento.cliente,
//       pedido: pagamento.pedido,
//     };
//   }

//   remove(id: number) {
//     return this.pagamentosRepository.remove(id);
//   }
// }
