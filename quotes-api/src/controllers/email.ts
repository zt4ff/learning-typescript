/* eslint-disable import/no-extraneous-dependencies */
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { messages } from '../helpers/messages';
import { isValidEmailAddress } from '../helpers/index';

// making use of mailtrap to create a fake smtp server here - https://mailtrap.io/inboxes/1619465/messages
if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_PORT) {
  throw new Error(messages.SMTP_CREDENTIAL_ERROR);
}
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailOption: SMTPTransport.Options = {
  from: '"QUOTES INCORPORATED", <admin@quotes.io>',
};

/**
 * @description Send emails using the fake SMTP provided my mailtrap to test email functionalites
 *              of the app
 * @example
 * const emailText = "welcome to this blah blah blah"
 * await sendEmail("abc@xyx.io", emailText, "Response Message")
 */
// eslint-disable-next-line max-len
export const sendEmail = (to: string, text: string, subject?: string) => new Promise((resolve, reject) => {
  if (!isValidEmailAddress(to)) {
    reject(new Error(messages.VALID_EMAIL_ERROR));
  }

  const sbj = `QUOTES API ${subject ? `- ${subject}` : ''}`;

  transport.sendMail({
    to, text, subject: sbj, ...emailOption,
  }, (err) => {
    if (err) reject(err.message);
    resolve(messages.EMAIL_SENT_SUCCESS);
  });
});
