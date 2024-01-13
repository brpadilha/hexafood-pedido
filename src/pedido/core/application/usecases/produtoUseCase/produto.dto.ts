import { ApiProperty } from '@nestjs/swagger';

export class InputProdutoDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  id_categoria: number;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  imagem: string;
}


export class OutputProdutoDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  id_categoria: number;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  imagem: string;
}