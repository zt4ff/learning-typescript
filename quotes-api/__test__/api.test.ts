/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import App from '../src/app';

describe('Some test', () => {
  let closeConnection: typeof mongoose;
  let app: express.Application;
  let request: supertest.SuperTest<supertest.Test>;
  let cookies: string;

  beforeAll(async () => {
    app = await App();
    closeConnection = App.closeConnection!;
    request = supertest(app);
  }, 30000);

  afterAll(() => {
    closeConnection.disconnect();
  });

  test('POST - login', async () => {
    const res = await request.post('/api/login').send({
      username: 'kay',
      password: 'abcdef',
    });
    // eslint-disable-next-line prefer-destructuring
    cookies = res.headers['set-cookie'].pop().split(';')[0];
    expect(res.status).toBe(200);
  });

  test('GET ALL QUOTES', async () => {
    const req = request.get('/api/quotes');
    req.cookies = cookies;
    const res = await req;
    expect(res.status).toBe(200);
  });

  test('POST A QUOTE', async () => {
    const req = request.post('/api/quote').send({
      quote: 'Are you kiddin` me brah?',
    });
    req.cookies = cookies;
    const res = await req;
    expect(res.status).toBe(200);
  });

  test('GET QUOTES FROM A USER', async () => {
    const req = request.get('/api/quotes/kay');
    req.cookies = cookies;
    const res = await req;
    expect(res.status).toBe(200);
  });
});
