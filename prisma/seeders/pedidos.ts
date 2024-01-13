import { PrismaClient } from '@prisma/client';
import {EventEmitter} from 'events';
import { Item, Pedido } from '../../src/pedido/core/domain/entity/pedido.entity';
import { Produto } from '../../src/pedido/core/domain/entity/produto.entity';
import { NovoPedidoEvent } from '../../src/pedido/core/application/events/novo-pedido.event';
import { PedidoDTO } from '../../src/pedido/core/application/usecases/pedidoUseCase/pedido.dto';

const generatePedido = ( pedido: Pedido) => ({
  where: { id: pedido.id },
  update: {},
  create: {
    id: pedido.id,
    codigo_pedido: pedido.codigo_pedido,
    valor_total: pedido.valor_total,
    status: pedido.status,
    createdAt: pedido.createdAt,
    updatedAt: pedido.updatedAt,
    id_cliente: pedido.id_cliente,
  },
});

export const seedPedidos = async (client: PrismaClient) => {
 
  const pedidosPromises = [];
  for (let i = 1; i <= 5; i++) {

    const pedido: Pedido = await SetPedidos(i);
    pedidosPromises.push(client.pedido.upsert(generatePedido(pedido)));
  }
  await Promise.all(pedidosPromises);
  await client.$executeRaw`SELECT setval(\'pedidos_id_seq\', (SELECT MAX(id) from "pedidos"))`;
};


async function SetPedidos(id: number): Promise<Pedido> {
  const pedidoDto: PedidoDTO =  await CreatePedidoDto(id);
  const produtos: Produto[] = ListProdutos();

  const pedido = new Pedido();
  pedido.id_cliente = id;
  pedido.id = id;

  pedido.itens = pedidoDto.itens.map((item) => {
    const produto = produtos.find((p) => p.id === item.id_produto);
    return {
      quantidade: item.quantidade,
      valor: produto.valor,
      id_produto: item.id_produto,
    };
  });

  pedido.valor_total = calculaValorTotal(pedido.itens);
  const emitter = new EventEmitter();
  emitter.emit('novo.pedido', new NovoPedidoEvent(pedido));
  return pedido;
}


function ListProdutos(): Produto[] {
  
  const produtos: Produto[] = [
    { 
      id: 1,
      nome : 'Hexa Lanche Feliz',
      id_categoria : 1,
      valor: 19.95,
      descricao: 'O clássico: pão, carne, e queijo.',
      imagem: 'https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    { 
      id: 2,
      nome:'Big Hexa Duplo',
      id_categoria: 1,
      valor: 29.9,
      descricao: 'Dois hambúrgueres, salada, muito queijo.',
      imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 3,
      nome:'Big Hexa',
      id_categoria: 1,
      valor:  25.9,
      descricao: 'Hambúrguer, salada, queijo.',
      imagem: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 4,
      nome:'Hexa Dog',
      id_categoria: 1,
      valor: 12.9,
      descricao: 'Cachorro quente minimalista',
      imagem: 'https://images.unsplash.com/photo-1612392062422-ef19b42f74df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 5,
      nome : 'Chips de batata',
      id_categoria : 2,
      valor: 9.9,
      descricao: 'Deliciosamente crocantes (300g)',
      imagem: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
      createdAt : new Date(),
      updatedAt : new Date()
    },
     
  ];

  return produtos;
}

function CreatePedidoDto(id: number) {  
  const pedidoDto = new PedidoDTO();
  pedidoDto.id_cliente = id;
  pedidoDto.itens = [
    {
      quantidade: id,
      valor: undefined,
      id_produto: id,
    },
  ];

  return pedidoDto;
}

function calculaValorTotal(itens: Item[]): number {
  return itens.reduce(
    (total, item) => total + item.quantidade * item.valor,
    0,
  );
}


