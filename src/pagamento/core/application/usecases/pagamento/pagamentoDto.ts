import { ApiProperty } from '@nestjs/swagger';
import { Pagamento } from '../../../domain/pagamento/entity/pagamento.entity';

export class PagamentoDto extends Pagamento {
  id?: number;
}

export class UpdatePagamentoDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  status: string;

  id_pedido?: number;
}
export class CreatePagamentoDto {
  id?: number;
  @ApiProperty()
  valor: number;

  @ApiProperty()
  id_pedido: number;

  @ApiProperty()
  cpf?: string;

  cliente?: {
    id?: number;
    nome?: string;
    cpf?: string;
  };
  id_cliente?: number;

  status?: string;
}

export class OutPutPagamentoDto {
  @ApiProperty()
  id?: number;

  id_transacao?: string | number;

  @ApiProperty()
  valor: number;

  @ApiProperty()
  id_pedido: number;

  @ApiProperty()
  cpf?: string;

  cliente?: {
    id?: number;
    nome?: string;
    cpf?: string;
  };
  id_cliente?: number;

  status?: string;

  pagamento?: {
    id: number;
    id_pedido: number;
    id_cliente: number;
    valor: number;
    status: string;
  }
}
