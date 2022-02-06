export class QuotesRoutesError extends Error {
  constructor(message: any) {
    super();
    this.message = message;
  }
}
