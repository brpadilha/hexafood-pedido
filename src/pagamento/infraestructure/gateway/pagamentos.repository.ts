import { PrismaClient } from '@prisma/client';
import { IPagamentosRepository } from '../../core/domain/pagamento/repository/pagamentos.repository';
import { Pagamento } from '../../core/domain/pagamento/entity/pagamento.entity';
import { PagamentoFactory } from 'src/pagamento/core/domain/pagamento/factory/pagamento.factory';
import { OutPutPagamentoDto } from 'src/pagamento/core/application/usecases/pagamento/pagamentoDto';

export class PagamentosRepository implements IPagamentosRepository {
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
  async createPagamento(data: Pagamento): Promise<OutPutPagamentoDto> {

    const createdPagamento = await this.prisma.pagamento.create({
      data: {
        id_pedido: data.id_pedido,
        id_transacao: data.id_transacao,
        descricao: data.descricao,
        plataforma: data.plataforma,
        valor: data.valor,
        id_cliente: data.id_cliente || null,
        status: data.status,
      },
    });

    return PagamentoFactory.create({
      ...createdPagamento,
      id_transacao: createdPagamento.id_transacao.toString(),
    });
  }

  findAll(): Promise<Pagamento[]> {
    return this.prisma.pagamento.findMany().then((results) => {
      return results.map((result) => {
        const pagamento = PagamentoFactory.create(result);
        pagamento.createdAt = result.createdAt;
        pagamento.updatedAt = result.updatedAt;
        return pagamento;
      });
    });
  }

  async findById(id: number): Promise<OutPutPagamentoDto | null> {
    const pagamento = await this.prisma.pagamento.findUnique({ where: { id } })  
    if (pagamento) {
      const pagamentoFactory = PagamentoFactory.create(pagamento);
      return {
        ...pagamentoFactory,
        id_transacao: pagamento.id_transacao.toString(),
      }
    }
      return null;

  }

  async remove(id: number) {
    return this.prisma.pagamento.delete({
      where: {
        id,
      },
    });
    
  }

  async update(id: number, status: string) {
    return this.prisma.pagamento.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
