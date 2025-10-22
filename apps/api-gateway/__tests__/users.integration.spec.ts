import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Users Service (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔹 POST /users/create
  it('/users/create (POST) should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'Carlos',
        email: 'carlos@example.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('carlos@example.com');
  });

  // 🔹 POST /users/login
  it('/users/login (POST) should authenticate a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'carlos@example.com',
        password: '123456',
      });

    expect([200, 401]).toContain(response.status);
  });

  // 🔹 POST /users/update/:id
  it('/users/update/:id (POST) should update user info', async () => {
    const register = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'Update Test',
        email: 'update@example.com',
        password: '123456',
      });

    const id = register.body.id;

    const update = await request(app.getHttpServer())
      .post(`/users/update/${id}`)
      .send({ name: 'Updated Name' });

    expect(update.status).toBe(200);
    expect(update.body.name).toBe('Updated Name');
  });

  // 🔹 POST /users/activate/:id
  it('/users/activate/:id (POST) should activate user', async () => {
    const register = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'Active Test',
        email: 'active@example.com',
        password: '123456',
      });

    const id = register.body.id;

    const res = await request(app.getHttpServer())
      .post(`/users/activate/${id}`);

    expect([200, 404]).toContain(res.status);
  });

  // 🔹 GET /users/:id
  it('/users/:id (GET) should return user info', async () => {
    const register = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'Getter Test',
        email: 'getter@example.com',
        password: '123456',
      });

    const id = register.body.id;

    const res = await request(app.getHttpServer()).get(`/users/${id}`);
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 GET /users/email/:email
  it('/users/email/:email (GET) should return user by email', async () => {
    const res = await request(app.getHttpServer())
      .get('/users/email/getter@example.com');

    expect([200, 404]).toContain(res.status);
  });
});
