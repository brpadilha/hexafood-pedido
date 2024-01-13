import { CategoriaException } from '../../application/exceptions/categoria.exception';

export class Categoria {
  id?: number;
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
    this.validate();
  }

  validate() {
    if (!this.nome || this.nome.trim() === '') {
      throw new CategoriaException('O nome não pode ser vazio');
    }
  }
}
