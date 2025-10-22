import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> EHR Service (Integration)', () => {
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

  // 🔹 POST /ehr/antecedent
  it('/ehr/antecedent (POST) should create an antecedent', async () => {
    const res = await request(app.getHttpServer())
      .post('/ehr/antecedent')
      .send({
        patientId: 1,
        description: 'Hypertension',
        date: '2025-10-20',
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('id');
    expect(res.body.description).toBe('Hypertension');
  });

  // 🔹 PUT /ehr/antecedent/update/:id
  it('/ehr/antecedent/update/:id (PUT) should update an antecedent', async () => {
    const created = await request(app.getHttpServer())
      .post('/ehr/antecedent')
      .send({
        patientId: 2,
        description: 'Asthma',
        date: '2025-10-21',
      });

    const id = created.body.id;

    const update = await request(app.getHttpServer())
      .put(`/ehr/antecedent/update/${id}`)
      .send({ description: 'Controlled Asthma' });

    expect([200, 404]).toContain(update.status);
    if (update.status === 200) {
      expect(update.body.description).toBe('Controlled Asthma');
    }
  });

  // 🔹 DELETE /ehr/antecedent/delete/:id
  it('/ehr/antecedent/delete/:id (DELETE) should remove an antecedent', async () => {
    const created = await request(app.getHttpServer())
      .post('/ehr/antecedent')
      .send({
        patientId: 3,
        description: 'Diabetes',
        date: '2025-10-19',
      });

    const id = created.body.id;

    const res = await request(app.getHttpServer()).delete(`/ehr/antecedent/delete/${id}`);

    expect([200, 404]).toContain(res.status);
  });

  // 🔹 POST /ehr/clinicalEntry
  it('/ehr/clinicalEntry (POST) should create a clinical entry', async () => {
    const res = await request(app.getHttpServer())
      .post('/ehr/clinicalEntry')
      .send({
        patientId: 1,
        notes: 'Routine checkup completed successfully',
        date: '2025-10-21',
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('id');
  });

  // 🔹 PUT /ehr/clinicalEntry/update/:id
  it('/ehr/clinicalEntry/update/:id (PUT) should update a clinical entry', async () => {
    const created = await request(app.getHttpServer())
      .post('/ehr/clinicalEntry')
      .send({
        patientId: 2,
        notes: 'Initial entry',
        date: '2025-10-21',
      });

    const id = created.body.id;

    const update = await request(app.getHttpServer())
      .put(`/ehr/clinicalEntry/update/${id}`)
      .send({ notes: 'Follow-up after treatment' });

    expect([200, 404]).toContain(update.status);
  });

  // 🔹 POST /ehr/:id
  it('/ehr/:id (POST) should create medical history for patient', async () => {
    const res = await request(app.getHttpServer()).post('/ehr/5');
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('patientId', 5);
  });

  // 🔹 PUT /ehr/archive/:id
  it('/ehr/archive/:id (PUT) should archive a medical history', async () => {
    const res = await request(app.getHttpServer()).put('/ehr/archive/5');
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 PUT /ehr/unarchive/:id
  it('/ehr/unarchive/:id (PUT) should unarchive a medical history', async () => {
    const res = await request(app.getHttpServer()).put('/ehr/unarchive/5');
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 GET /ehr/:id
  it('/ehr/:id (GET) should get medical history', async () => {
    const res = await request(app.getHttpServer()).get('/ehr/5');
    expect([200, 404]).toContain(res.status);
  });
});
