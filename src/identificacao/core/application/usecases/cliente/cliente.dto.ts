import { ApiProperty } from '@nestjs/swagger';

export class InputClienteDto {
  id?: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  createdAt?: Date;
}

export class OutputClienteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  createdAt?: Date;
}