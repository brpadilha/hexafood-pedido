export class PagamentosException extends Error {
    constructor(message: string) {
      super(message);
        this.name = 'PagamentosException';
      }
    }
    