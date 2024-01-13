export class ClienteException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClienteException';
  }
}
