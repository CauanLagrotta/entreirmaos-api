export class ContactNotFoundError extends Error {
  constructor() {
    super("Email not found");
  }
}
