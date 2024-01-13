import { ApiProperty } from '@nestjs/swagger';
import { CreateItemDTO } from '../item.dto';

export class InputPedidoDTO {
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
}

export class OutputPedidoDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];
}


export class PedidoDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_cliente?: number;
  @ApiProperty({ type: () => [CreateItemDTO] })
  itens: CreateItemDTO[];

}