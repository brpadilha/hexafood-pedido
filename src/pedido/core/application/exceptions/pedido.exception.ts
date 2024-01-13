export class PedidoException extends Error {
    constructor(message:string) {
      super(message);
      this.name = 'PedidoException';
    }
  }
  