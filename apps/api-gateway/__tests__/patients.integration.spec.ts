import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Patients Service (Integration)', () => {
    let app: INestApplication;
    let createdPatient: any; // 🔹 almacenará los datos del paciente creado

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // 🔹 Crear un paciente único al inicio
        const random = Math.floor(Math.random() * 1000000);
        const response = await request(app.getHttpServer())
            .post('/patients/register')
            .send({
                documentType: 'CC',
                documentNumber: `1045${random}`,
                firstName: 'Dunord',
                lastName: 'Ortega',
                birthDate: '2025-10-21T22:33:48.790Z',
                gender: 'Male',
                address: 'Barranquilla',
                phone: `300${random}`,
                email: `dunord${random}@mail.com`,
                emergencyContact: `567${random}`
            });

        expect(response.status).toBe(201);
        createdPatient = response.body; // guardamos el paciente para los demás tests
    });

    afterAll(async () => {
        await app.close();
    });

    // 🔹 Verificar creación (confirmar datos)
    it('should have created a new patient successfully', async () => {
        expect(createdPatient).toHaveProperty('patientId');
        expect(createdPatient.firstName).toBe('Dunord');
    });

    // 🔹 Actualizar el paciente
    it('/patients/update/:id (POST) should update a patient', async () => {
        const update = await request(app.getHttpServer())
            .put(`/patients/update/${createdPatient.patientId}`)
            .send({
                address: 'New Avenue 123',
                phone: '555111333',
                email: 'new@mail.com',
                emergencyContact: '3088883245'
            });

        expect(update.status).toBe(200);
        expect(update.body.address).toBe('New Avenue 123');
        expect(update.body.email).toBe('new@mail.com');
    });

    // 🔹 Buscar por documento
    it('/patients/document (GET) should retrieve by document', async () => {
        const res = await request(app.getHttpServer())
            .get('/patients/document')
            .query({
                documentType: 'CC',
                documentNumber: createdPatient.documentNumber
            });
        expect(res.status).toBe(200);
        expect(res.body.documentNumber).toBe(createdPatient.documentNumber);
    });

    // 🔹 Buscar por nombre
    it('/patients/name (GET) should retrieve by name', async () => {
        const res = await request(app.getHttpServer())
            .get('/patients/name')
            .query({
                firstName: createdPatient.firstName,
                lastName: createdPatient.lastName
            });
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(createdPatient.firstName);
    });

    // 🔹 Obtener por ID
    it('/patients/:id (GET) should retrieve a patient by ID', async () => {
        const res = await request(app.getHttpServer()).get(`/patients/${createdPatient.patientId}`);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(createdPatient.firstName);
    });

    // 🔹 Obtener triage
    it('/patients/triage/:id (GET) should return triage info', async () => {
        const res = await request(app.getHttpServer()).get(`/patients/triage/${createdPatient.patientId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 Obtener EHR
    it('/patients/ehr/:id (GET) should return ehr info', async () => {
        const res = await request(app.getHttpServer()).get(`/patients/ehr/${createdPatient.patientId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 Archivar paciente (último test)
    it('/patients/archive/:id (POST) should archive the patient', async () => {
        const archive = await request(app.getHttpServer())
            .put(`/patients/archive/${createdPatient.patientId}`);
        expect(archive.status).toBe(200);
        expect(archive.body.status).toBe('archived');
    });
});
