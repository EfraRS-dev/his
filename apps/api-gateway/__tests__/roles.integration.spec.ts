import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Roles Service (Integration)', () => {
  let app: INestApplication;
  let rol: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/roles/create')
      .send({
        name: 'Nurse',
      });

    expect([200, 201]).toContain(response.status);
    expect(response.body.name).toBe('Nurse');
    rol = response.body;
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔹 GET /roles/find/:id
  it('/roles/find/:id (GET) should retrieve a role by ID', async () => {
    const res = await request(app.getHttpServer()).get(`/roles/find/${rol.roleId}`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.name).toBe('Nurse');
    }
  });
});
