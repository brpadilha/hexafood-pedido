import { PrismaClient } from '@prisma/client';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { ClienteFactory } from 'src/identificacao/core/domain/cliente/factory/cliente.factory';

export class PedidosRepository implements IPedidosRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, 
        },
      },
    });
  }

  create(pedido: Pedido): Promise<Pedido> {
    return this.prisma.pedido
      .create({
        data: {
          codigo_pedido: pedido.codigo_pedido,
          valor_total: pedido.valor_total,
          id_cliente: pedido.id_cliente,
          status: StatusPedido[pedido.status].valueOf(),
          itens: {
            create: pedido.itens.map((item) => ({
              quantidade: item.quantidade,
              valor: item.valor,
              produto: {
                connect: {
                  id: item.id_produto,
                },
              },
            })),
          },
        },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
      .then((result) => {
        const createdPedido = new Pedido();
        createdPedido.id = result.id;
        createdPedido.codigo_pedido = result.codigo_pedido;
        createdPedido.status =
          StatusPedido[result.status as keyof typeof StatusPedido];
        createdPedido.createdAt = result.createdAt;
        createdPedido.updatedAt = result.updatedAt;
        createdPedido.id_cliente = result.id_cliente;
        createdPedido.valor_total = result.valor_total;
        createdPedido.itens = result.itens.map((item) => ({
          id: item.id,
          quantidade: item.quantidade,
          valor: item.valor,
          id_produto: item.id_produto,
          produto: item.produto,
        }));
        return createdPedido;
      });
  }
  findAll(status?: StatusPedido): Promise<Pedido[]> {
    return this.prisma.pedido
      .findMany({
        where: status ? { status: status.toString() } : undefined, // Filtrar por status, se ele for fornecido
        orderBy: {
          createdAt: 'asc', // Ordenar por data de criação, em ordem crescente
        },
        include: {
          cliente: true,
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
      .then((results) => {
        return results.map((result) => {
          const pedido = new Pedido();
          pedido.id = result.id;
          pedido.codigo_pedido = result.codigo_pedido;
          pedido.status =
            StatusPedido[result.status as keyof typeof StatusPedido];
          pedido.createdAt = result.createdAt;
          pedido.updatedAt = result.updatedAt;
          pedido.cliente = ClienteFactory.create(result.cliente);
          pedido.valor_total = result.valor_total;
          pedido.itens = result.itens.map((item) => ({
            id: item.id,
            // numero_item: item.numero_item,
            quantidade: item.quantidade,
            valor: item.valor,
            id_produto: item.id_produto,
            produto: item.produto,
          }));
          return pedido;
        });
      });
  }
  update(id: number, pedido: Pedido) {
    return this.prisma.pedido.update({
      where: {
        id,
      },
      data: {
        codigo_pedido: pedido.codigo_pedido,
        status: StatusPedido[pedido.status],
        updatedAt: pedido.updatedAt,
        id_cliente: pedido.cliente ? pedido.cliente.id : null,
        valor_total: pedido.valor_total,
      },
    });
  }
  findByStatus(status: StatusPedido) {
    return this.prisma.pedido.findMany({
      where: { status: status.toString() },
    });
  }
  
  findById(id: number): Promise<Pedido> {
    return this.prisma.pedido
      .findUnique({
        where: {
          id,
        },
        include: {
          cliente: true,
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
      .then((result) => {
        const pedido = new Pedido();
        pedido.id = result.id;
        pedido.codigo_pedido = result.codigo_pedido;
        pedido.status =
          StatusPedido[result.status as keyof typeof StatusPedido];
        pedido.createdAt = result.createdAt;
        pedido.updatedAt = result.updatedAt;
        pedido.cliente = ClienteFactory.create(result.cliente);
        pedido.valor_total = result.valor_total;
        pedido.itens = result.itens.map((item) => ({
          id: item.id,
          // numero_item: item.numero_item,
          quantidade: item.quantidade,
          valor: item.valor,
          id_produto: item.id_produto,
          produto: item.produto,
        }));
        return pedido;
      });
  }
  findByCodigo(codigo_pedido: string): Promise<Pedido> {
    return this.prisma.pedido
      .findUnique({
        where: {
          codigo_pedido,
        },
        include: {
          cliente: true,
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
      .then((result) => {
        const pedido = new Pedido();
        pedido.id = result.id;
        pedido.codigo_pedido = result.codigo_pedido;
        pedido.status =
          StatusPedido[result.status as keyof typeof StatusPedido];
        pedido.createdAt = result.createdAt;
        pedido.updatedAt = result.updatedAt;
        pedido.cliente = ClienteFactory.create(result.cliente);
        pedido.valor_total = result.valor_total;
        pedido.itens = result.itens.map((item) => ({
          id: item.id,
          quantidade: item.quantidade,
          valor: item.valor,
          id_produto: item.id_produto,
          produto: item.produto,
        }));
        return pedido;
      });
  }
}
