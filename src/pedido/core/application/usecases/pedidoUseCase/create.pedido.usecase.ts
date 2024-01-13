import { Injectable, Inject } from '@nestjs/common';
import EventEmitter from 'events';
import { FindClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { InputPedidoDTO, OutputPedidoDTO } from './pedido.dto';
import { FindByIdsProdutosUseCase } from '../produtoUseCase/find.by.ids.produtos.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { PedidoException } from '../../exceptions/pedido.exception';
import { NovoPedidoEvent } from '../../events/novo-pedido.event';
import { Item, Pedido } from 'src/pedido/core/domain/entity/pedido.entity';

@Injectable()
export class CreatePedidoUseCase {
  constructor(
    @Inject('IPedidosRepository')
    private pedidosRepository: IPedidosRepository,
    private findByIdsProdutosUseCase: FindByIdsProdutosUseCase,
    private findClienteUseCase: FindClienteUseCase,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async execute(pedidoDto: InputPedidoDTO) {

    const pedido: Pedido = await this.validarCamposPedido(pedidoDto);

    const { id } = await this.pedidosRepository.create(pedido);
    pedido.id = id;
    this.eventEmitter.emit('novo.pedido', new NovoPedidoEvent(pedido));

    return pedido;
  }

  private async validarCamposPedido (pedidoDto: InputPedidoDTO): Promise<Pedido> {
    const productIds = pedidoDto.itens.map((item) => item.id_produto);
    const produtos = await this.findByIdsProdutosUseCase.execute(productIds);

    const pedido = new Pedido();

    pedido.id_cliente = pedidoDto.id_cliente === 0 ? null : pedidoDto.id_cliente;

    if (pedido.id_cliente > 0) {
      const cliente = await this.findClienteUseCase.execute(pedidoDto.id_cliente);
      if(!cliente){
        throw new PedidoException(`Cliente não cadastrado. Id_cliente: ${pedidoDto.id_cliente}`);
      }
      pedido.cliente = cliente;
    }

    pedido.itens = pedidoDto.itens.map((item) => {
      const produto = produtos.find((p) => p.id === item.id_produto);
      if (!produto) {
        throw new PedidoException(`Produto não cadastrado. id_produto: ${item.id_produto}`);
      }
      return {
        quantidade: item.quantidade,
        valor: produto.valor,
        id_produto: item.id_produto,
      };
    });

    pedido.valor_total = this.calculaValorTotal(pedido.itens);
    
    return pedido;
  }

  private calculaValorTotal(itens: Item[]): number {
    return itens.reduce(
      (total, item) => total + item.quantidade * item.valor,
      0,
    );
  }
}