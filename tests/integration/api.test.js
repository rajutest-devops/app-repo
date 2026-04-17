const request = require('supertest');
const app = require('../../src/app');

describe('Health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Auth', () => {
  let token;

  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'pass123' });
    expect(res.status).toBe(201);
  });

  it('rejects duplicate user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'dup', password: 'x' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'dup', password: 'x' });
    expect(res.status).toBe(409);
  });

  it('logs in and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'pass123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});

describe('Products', () => {
  let token;

  beforeAll(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'produser', password: 'pass' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'produser', password: 'pass' });
    token = res.body.token;
  });

  it('blocks unauthenticated request', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(401);
  });

  it('returns products with valid token', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  it('returns 404 for missing product', async () => {
    const res = await request(app)
      .get('/api/products/9999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});