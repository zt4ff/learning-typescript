export const messages = {
  // emails messsages
  SMTP_CREDENTIAL_ERROR: 'please provide SMTP server credentials',
  VALID_EMAIL_ERROR: 'expects a valid email',
  EMAIL_SENT_SUCCESS: 'email sent successfully',

  // quotes messages
  QUOTE_UPLOAD_SUCCESS: 'quote uploaded successfully',
  QUOTE_DELETE_SUCCESS: 'quote deleted successfully',

  // users/validation/authentication messages
  ALL_CREDENTIAL_ERROR: 'username, password and email should be provided',
  CREDENTIAL_IS_EMPTY_ERROR: 'username, password and email should not be empty',
  USERNAME_EXISTS_ERROR: 'username exists',
  ACCOUNT_CREATION_SUCCESS: 'account created successfully',
  LOGIN_SUCCESS: 'login successful',
  LOGIN_CREDIENTIAL_ERROR: 'input username and password',
  INCORRECT_LOGIN_CREDIENTIAL: 'incorrect username and password',
  userCreationEmail: (username: string) => `Hi ${username}\nYour account was created successfully. Thanks.\n\nJohn Hopkin\nCEO, Quote API`,
};
