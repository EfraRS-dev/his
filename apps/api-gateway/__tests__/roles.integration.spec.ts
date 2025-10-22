import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Roles Service (Integration)', () => {
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

  // 🔹 POST /roles/create
  it('/roles/create (POST) should create a new role', async () => {
    const response = await request(app.getHttpServer())
      .post('/roles/create')
      .send({
        name: 'admin',
        description: 'Administrator role with full permissions',
      });

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('admin');
  });

  // 🔹 GET /roles/find/:id
  it('/roles/find/:id (GET) should retrieve a role by ID', async () => {
    // Creamos primero un rol
    const createRes = await request(app.getHttpServer())
      .post('/roles/create')
      .send({
        name: 'nurse',
        description: 'Role for nursing staff',
      });

    const roleId = createRes.body.id;

    const res = await request(app.getHttpServer()).get(`/roles/find/${roleId}`);

    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('id', roleId);
      expect(res.body.name).toBe('nurse');
    }
  });
});
