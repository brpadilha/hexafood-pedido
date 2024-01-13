import { PrismaClient } from '@prisma/client';
import { Cliente } from '../../core/domain/cliente/entity/cliente.entity';
import { IClientesRepository } from '../../core/domain/cliente/repository/clientes.repository';
import { ClienteFactory } from 'src/identificacao/core/domain/cliente/factory/cliente.factory';

export class ClientesRepository implements IClientesRepository {
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

  async create(data: Cliente): Promise<Cliente> {
    const newClienteData = await this.prisma.cliente.create({ data });
    return ClienteFactory.create(newClienteData);
  }

  async findUnique(cpf: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { cpf: cpf },
    });
    if (cliente) {
      return ClienteFactory.create(cliente);
    }
    return null;
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const exist = await this.prisma.cliente.count({
      where: { cpf: cpf },
    });
    return exist > 0;
  }

  async findById(id: number): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    if (cliente) {
      return ClienteFactory.create(cliente);
    }
    return null;
  }
}
