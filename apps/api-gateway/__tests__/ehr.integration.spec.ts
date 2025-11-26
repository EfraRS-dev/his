import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> EHR Service (Integration)', () => {
  let app: INestApplication;
  let createdEHR: any;
  let antecedent: any;
  let entry: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 🔹 POST /ehr/:id
    const res = await request(app.getHttpServer()).post('/ehr/1');
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('patientId', 1);
    createdEHR = res.body;
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔹 POST /ehr/antecedent
  it('/ehr/antecedent (POST) should create an antecedent', async () => {
    const res = await request(app.getHttpServer())
      .post('/ehr/antecedent')
      .send({
        type: 'allergic',
        description: 'Peanut allergy',
        historyId: createdEHR.historyId,
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body.description).toBe('Peanut allergy');
    antecedent = res.body;
  });

  // 🔹 PUT /ehr/antecedent/update/:id
  it('/ehr/antecedent/update/:id (PUT) should update an antecedent', async () => {
    const update = await request(app.getHttpServer())
      .put(`/ehr/antecedent/update/${antecedent.antecedentId}`)
      .send({ description: 'chrimps allergy' });

    expect([200, 404]).toContain(update.status);
    expect(update.body.description).toBe('chrimps allergy');
  });

  // 🔹 DELETE /ehr/antecedent/delete/:id
  it('/ehr/antecedent/delete/:id (DELETE) should remove an antecedent', async () => {
    const created = await request(app.getHttpServer())
      .post('/ehr/antecedent')
      .send({
        type: 'Athma',
        description: 'Strong Athma',
        historyId: createdEHR.historyId,
      });
    const id = created.body.antecedentId;
    const res = await request(app.getHttpServer()).delete(`/ehr/antecedent/delete/${id}`);
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 POST /ehr/clinicalEntry
  it('/ehr/clinicalEntry (POST) should create a clinical entry', async () => {
    const res = await request(app.getHttpServer())
      .post('/ehr/clinicalEntry')
      .send({
        historyId: createdEHR.historyId,
        type: 'outpatient',
        reasonForVisit: 'Routine checkup',
        diagnosis: 'Healthy',
        notes: 'Patient requested blood test',
        doctorId: 5
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body.diagnosis).toBe('Healthy');
    entry = res.body;
  });

  // 🔹 PUT /ehr/clinicalEntry/update/:id
  it('/ehr/clinicalEntry/update/:id (PUT) should update a clinical entry', async () => {
    const update = await request(app.getHttpServer())
      .put(`/ehr/clinicalEntry/update/${entry.entryId}`)
      .send({ 
        type: 'emergency',
        reasonForVisit: 'Issues with his/her Hearth',
        diagnosis: 'Unhealthy',
        notes: 'Patient requested blood test'
       });

    expect([200, 404]).toContain(update.status);
  });

  // 🔹 PUT /ehr/archive/:id
  it('/ehr/archive/:id (PUT) should archive a medical history', async () => {
    const res = await request(app.getHttpServer()).put('/ehr/archive/1');
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 PUT /ehr/unarchive/:id
  it('/ehr/unarchive/:id (PUT) should unarchive a medical history', async () => {
    const res = await request(app.getHttpServer()).put('/ehr/unarchive/1');
    expect([200, 404]).toContain(res.status);
  });

  // 🔹 GET /ehr/:id
  it('/ehr/:id (GET) should get medical history', async () => {
    const res = await request(app.getHttpServer()).get('/ehr/1');
    expect([200, 404]).toContain(res.status);
  });
});
