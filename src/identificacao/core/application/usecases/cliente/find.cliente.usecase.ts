import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';
import { ClienteException } from '../../exceptions/cliente.exception';
import { Inject } from '@nestjs/common';

export class FindClienteUseCase {
  constructor(    
    @Inject(IClientesRepository)
    private clientesRepository: IClientesRepository) {}

  async execute(id: number) {
    const cliente =  this.clientesRepository.findById(id);
    if (!cliente) {
      throw new ClienteException('Cliente não encontrado');
    }
    return cliente;
  }
}
