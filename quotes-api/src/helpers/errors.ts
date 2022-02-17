/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */

export const ERRORS = {
  QuotesRoutesError: class QuotesRoutesError extends Error {
    constructor(messsage: string) {
      super(messsage);
    }
  },
  AuthError: class AuthError extends Error {
    constructor(messsage: string) {
      super(messsage);
    }
  },
};
