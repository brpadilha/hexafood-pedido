import { forwardRef, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ValidationFilter } from './infraestructure/filter/validation.filter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NovoPedidoListener } from './infraestructure/gateway/listeners/novo-pedido.listener';
import { PagamentoModule } from 'src/pagamento/pagamento.module';
import { IdentificacaoModule } from 'src/identificacao/identificacao.module';
import { FindClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { IProdutosRepository } from './core/domain/repository/produtos.repository';
import { ICategoriasRepository } from './core/domain/repository/categorias.repository';
import { IPedidosRepository } from './core/domain/repository/pedidos.repository';
import { ProdutosController } from './infraestructure/controller/produtos.controller';
import { CategoriasController } from './infraestructure/controller/categorias.controller';
import { PedidosController } from './infraestructure/controller/pedidos.controller';
import { ProdutosRepository } from './infraestructure/gateway/produtos.repository';
import { CategoriasRepository } from './infraestructure/gateway/categorias.repository';
import { PedidosRepository } from './infraestructure/gateway/pedidos.repository';
import { CreateCategoriaUseCase } from './core/application/usecases/categoriaUseCases/create.categoria.usecase';
import { FindAllCategoriaUseCase } from './core/application/usecases/categoriaUseCases/find.all.categoria.usecase';
import { FindByIdCategoriaUseCase } from './core/application/usecases/categoriaUseCases/find.by.categoria.produto.usecase';
import { FinalizarPreparacaoPedidoUseCase } from './core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { FinalizarPedidoUseCase } from './core/application/usecases/pedidoUseCase/finalizar.pedido.usecase';
import { CreatePedidoUseCase } from './core/application/usecases/pedidoUseCase/create.pedido.usecase';
import { FindAllPedidosUseCase } from './core/application/usecases/pedidoUseCase/find.all.pedidos.usecase';
import { FindPedidoByCodigoUseCase } from './core/application/usecases/pedidoUseCase/find.pedido.by.codigo.usecase';
import { FindPedidoByIdUseCase } from './core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';
import { IniciarPreparacaoPedidoUseCase } from './core/application/usecases/pedidoUseCase/iniciar.preparacao.usecase';
import { PedidosPendentesUseCase } from './core/application/usecases/pedidoUseCase/pedidos.pendentes.usecase';
import { CreateProdutoUseCase } from './core/application/usecases/produtoUseCase/create.produto.usecase';
import { DeleteProdutoUseCase } from './core/application/usecases/produtoUseCase/delete.produto.usecase';
import { ExistProdutoUseCase } from './core/application/usecases/produtoUseCase/exist.produto.usecase';
import { FindAllProdutosUseCase } from './core/application/usecases/produtoUseCase/find.all.produtos.usecase';
import { FindByIdProdutoUseCase } from './core/application/usecases/produtoUseCase/find.by.id.produto.usecase';
import { FindByIdsProdutosUseCase } from './core/application/usecases/produtoUseCase/find.by.ids.produtos.usecase';
import { UpdateProdutoUseCase } from './core/application/usecases/produtoUseCase/update.produto.usecase';
import { CreatePagamentoUseCase } from 'src/pagamento/core/application/usecases/pagamento/create.pagamento.usecase';
import { UpdatePedidoUseCase } from './core/application/usecases/pedidoUseCase/update.pedido.usecase';

@Module({
  imports: [ forwardRef(() => IdentificacaoModule), forwardRef(() => PagamentoModule) ],
  controllers: [ProdutosController, CategoriasController, PedidosController],
  providers: [
    { provide: IProdutosRepository, useClass: ProdutosRepository },
    { provide: ICategoriasRepository, useClass: CategoriasRepository },
    { provide: IPedidosRepository, useClass: PedidosRepository },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
    {
       provide: FindClienteUseCase, 
       useClass: FindClienteUseCase,
    },
    {
      provide: CreatePagamentoUseCase, 
      useClass: CreatePagamentoUseCase,
   },
    CreateCategoriaUseCase,
    FindAllCategoriaUseCase,
    FindByIdCategoriaUseCase,
    CreatePedidoUseCase,
    FinalizarPedidoUseCase,
    FinalizarPreparacaoPedidoUseCase,
    FindAllPedidosUseCase,
    FindPedidoByCodigoUseCase,
    FindPedidoByIdUseCase,
    IniciarPreparacaoPedidoUseCase,
    PedidosPendentesUseCase,
    CreateProdutoUseCase,
    DeleteProdutoUseCase,
    ExistProdutoUseCase,
    FindAllProdutosUseCase,
    FindByIdProdutoUseCase,
    FindByIdsProdutosUseCase,
    UpdateProdutoUseCase,
    NovoPedidoListener,
    UpdatePedidoUseCase
  ],
  exports: [FindPedidoByIdUseCase, UpdatePedidoUseCase, IPedidosRepository],
})
export class PedidoModule {}
