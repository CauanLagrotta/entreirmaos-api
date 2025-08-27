export class ContactNotFoundError extends Error {
  constructor() {
    super("E-mail não encontrado");
  }
}
