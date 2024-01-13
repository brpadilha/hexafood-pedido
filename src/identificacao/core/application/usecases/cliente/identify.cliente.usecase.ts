import { Cliente } from 'src/identificacao/core/domain/cliente/entity/cliente.entity';
import { IClientesRepository } from '../../../domain/cliente/repository/clientes.repository';
import { ClienteException } from '../../exceptions/cliente.exception';
import { Inject } from '@nestjs/common';

export class IndentifyClienteUseCase {
  constructor(
    @Inject('IClientesRepository')
    private clientesRepository: IClientesRepository,
  ) {}

  async execute(cpf: string): Promise<Cliente | null> {
    const cliente = await this.clientesRepository.findUnique(cpf);
    if (!cliente) {
      throw new ClienteException('Cpf não encontrado');
    }
    return cliente;
  }
}
