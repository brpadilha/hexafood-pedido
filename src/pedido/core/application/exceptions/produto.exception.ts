export class ProdutoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProdutoException';
  }
}