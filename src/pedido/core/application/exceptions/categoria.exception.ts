export class CategoriaException extends Error {
  constructor(message: string) {
    super(message);
      this.name = 'CategoriaException';
    }
  }
  