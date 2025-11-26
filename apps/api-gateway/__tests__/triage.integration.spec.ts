import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Triage Service (Integration)', () => {
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

  it('/triage (POST) should create a triage record through gateway', async () => {
    const response = await request(app.getHttpServer())
      .post('/triage')
      .send({
        patientId: 1,
        temperature: 38.2,
        heartRate: 90,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('/triage/:id (GET) should retrieve triage by ID', async () => {
    const created = await request(app.getHttpServer())
      .post('/triage')
      .send({
        patientId: 2,
        temperature: 36.9,
        heartRate: 75,
      });

    const getRes = await request(app.getHttpServer()).get(`/triage/${created.body.id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.patientId).toBe(2);
  });
});
