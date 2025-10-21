import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TriageModule } from '../src/triage.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';

describe('Triage Module (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  // Test data IDs
  let createdTriageId: number;
  let createdVitalSignsId: number;
  const testPatientId = 1;
  const testNurseId = 3; // Assuming nurse with NURSE role (roleId: 3)
  const testDoctorId = 2; // Assuming doctor with DOCTOR role (roleId: 2)

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TriageModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply global pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Cleanup: Delete all test data
    if (createdTriageId) {
      await prismaService.vitalSigns.deleteMany({
        where: { triageId: createdTriageId },
      });
      await prismaService.triage.delete({
        where: { id: createdTriageId },
      });
    }

    await prismaService.$disconnect();
    await app.close();
  });

  describe('Health Check', () => {
    it('/triage/health (GET) - should return health status', () => {
      return request(app.getHttpServer())
        .get('/triage/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'OK');
          expect(res.body).toHaveProperty('service');
          expect(res.body).toHaveProperty('timestamp');
        });
    });
  });

  describe('Create Triage', () => {
    it('/triage (POST) - should create a new triage entry', () => {
      const createTriageDto = {
        patientId: testPatientId,
        nurseId: testNurseId,
        urgencyLevel: 3,
        initialObservations: 'Patient complains of chest pain',
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(createTriageDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('triageId');
          expect(res.body.patientId).toBe(testPatientId);
          expect(res.body.nurseId).toBe(testNurseId);
          expect(res.body.urgencyLevel).toBe(3);
          expect(res.body.initialObservations).toBe(
            'Patient complains of chest pain',
          );
          expect(res.body.isActive).toBe(true);

          // Store the created triage ID for later tests
          createdTriageId = res.body.triageId;
        });
    });

    it('/triage (POST) - should fail with invalid urgency level', () => {
      const invalidTriageDto = {
        patientId: testPatientId,
        nurseId: testNurseId,
        urgencyLevel: 6, // Invalid: must be 1-5
        initialObservations: 'Test',
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(invalidTriageDto)
        .expect(400);
    });

    it('/triage (POST) - should fail when patient does not exist', () => {
      const createTriageDto = {
        patientId: 999999, // Non-existent patient
        nurseId: testNurseId,
        urgencyLevel: 2,
        initialObservations: 'Test',
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(createTriageDto)
        .expect(404);
    });

    it('/triage (POST) - should fail when nurse does not exist', () => {
      const createTriageDto = {
        patientId: testPatientId,
        nurseId: 999999, // Non-existent nurse
        urgencyLevel: 2,
        initialObservations: 'Test',
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(createTriageDto)
        .expect(404);
    });

    it('/triage (POST) - should fail when user does not have NURSE role', () => {
      const createTriageDto = {
        patientId: testPatientId,
        nurseId: 1, // User with ADMIN role (roleId: 1)
        urgencyLevel: 2,
        initialObservations: 'Test',
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(createTriageDto)
        .expect(400);
    });
  });

  describe('Register Triage with Vital Signs', () => {
    beforeEach(async () => {
      // Clean up any active triage for the test patient
      await prismaService.triage.updateMany({
        where: {
          patientId: testPatientId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    });

    it('/triage/register (POST) - should register triage with vital signs', () => {
      const registerTriageDto = {
        patientId: testPatientId,
        nurseId: testNurseId,
        urgencyLevel: 2,
        initialObservations: 'Patient has fever and cough',
        vitalSigns: {
          temperature: 38.5,
          bloodPressure: '130/85',
          heartRate: 95,
          respiratoryRate: 22,
          oxygenSaturation: 96,
          additionalNotes: 'Elevated temperature',
        },
      };

      return request(app.getHttpServer())
        .post('/triage/register')
        .send(registerTriageDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('triage');
          expect(res.body).toHaveProperty('vitalSigns');
          expect(res.body.triage.patientId).toBe(testPatientId);
          expect(res.body.triage.urgencyLevel).toBe(2);
          expect(res.body.vitalSigns.temperature).toBe(38.5);
          expect(res.body.vitalSigns.bloodPressure).toBe('130/85');
          expect(res.body.vitalSigns.heartRate).toBe(95);

          createdTriageId = res.body.triage.triageId;
          createdVitalSignsId = res.body.vitalSigns.vitalSignsId;
        });
    });

    it('/triage/register (POST) - should fail when patient already has active triage', async () => {
      // First, create an active triage
      await prismaService.triage.create({
        data: {
          patientId: testPatientId,
          nurseId: testNurseId,
          urgencyLevel: 3,
          initialObservations: 'Existing triage',
          isActive: true,
        },
      });

      const registerTriageDto = {
        patientId: testPatientId,
        nurseId: testNurseId,
        urgencyLevel: 2,
        initialObservations: 'Another triage',
        vitalSigns: {
          temperature: 36.5,
          bloodPressure: '120/80',
          heartRate: 75,
          respiratoryRate: 16,
          oxygenSaturation: 98,
        },
      };

      return request(app.getHttpServer())
        .post('/triage/register')
        .send(registerTriageDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('already has an active triage');
        });
    });
  });

  describe('Get Triage', () => {
    it('/triage/:id (GET) - should retrieve triage by ID', () => {
      return request(app.getHttpServer())
        .get(`/triage/${createdTriageId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.triageId).toBe(createdTriageId);
          expect(res.body.patientId).toBe(testPatientId);
          expect(res.body).toHaveProperty('urgencyLevel');
          expect(res.body).toHaveProperty('isActive');
        });
    });

    it('/triage/:id (GET) - should return 404 for non-existent triage', () => {
      return request(app.getHttpServer()).get('/triage/999999').expect(404);
    });

    it('/triage/patient/:patientId (GET) - should retrieve triage by patient ID', () => {
      return request(app.getHttpServer())
        .get(`/triage/patient/${testPatientId}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0].patientId).toBe(testPatientId);
        });
    });

    it('/triage/patient/:patientId/active (GET) - should retrieve active triage', () => {
      return request(app.getHttpServer())
        .get(`/triage/patient/${testPatientId}/active`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('triageId');
          expect(res.body.patientId).toBe(testPatientId);
          expect(res.body.isActive).toBe(true);
        });
    });
  });

  describe('Update Triage', () => {
    it('/triage/:id (PATCH) - should update triage urgency level', () => {
      const updateDto = {
        urgencyLevel: 1, // Upgrade to highest priority
        additionalObservations: 'Patient condition deteriorated',
        updatedBy: testDoctorId,
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.triage.urgencyLevel).toBe(1);
          expect(res.body.triage.triageId).toBe(createdTriageId);
        });
    });

    it('/triage/:id (PATCH) - should update triage with vital signs', () => {
      const updateDto = {
        urgencyLevel: 2,
        additionalObservations: 'Re-assessed after treatment',
        updatedBy: testNurseId,
        vitalSigns: {
          temperature: 37.2,
          bloodPressure: '125/82',
          heartRate: 80,
          respiratoryRate: 18,
          oxygenSaturation: 98,
          additionalNotes: 'Improved after medication',
        },
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.triage.urgencyLevel).toBe(2);
          expect(res.body.vitalSigns).toBeDefined();
          expect(res.body.vitalSigns.temperature).toBe(37.2);
        });
    });

    it('/triage/:id (PATCH) - should fail when user does not exist', () => {
      const updateDto = {
        urgencyLevel: 2,
        updatedBy: 999999, // Non-existent user
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}`)
        .send(updateDto)
        .expect(404);
    });

    it('/triage/:id (PATCH) - should fail when user is not active', () => {
      const updateDto = {
        urgencyLevel: 2,
        updatedBy: 4, // Assuming user with status 'inactive'
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}`)
        .send(updateDto)
        .expect(400);
    });

    it('/triage/:id (PATCH) - should fail when triage does not exist', () => {
      const updateDto = {
        urgencyLevel: 2,
        updatedBy: testNurseId,
      };

      return request(app.getHttpServer())
        .patch('/triage/999999')
        .send(updateDto)
        .expect(404);
    });
  });

  describe('Update Priority', () => {
    it('/triage/:id/priority (PATCH) - should update only priority', () => {
      const updatePriorityDto = {
        urgencyLevel: 5,
        reason: 'Patient stable, downgraded priority',
        updatedBy: testNurseId,
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}/priority`)
        .send(updatePriorityDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.urgencyLevel).toBe(5);
          expect(res.body.triageId).toBe(createdTriageId);
        });
    });

    it('/triage/:id/priority (PATCH) - should fail with invalid urgency level', () => {
      const updatePriorityDto = {
        urgencyLevel: 0, // Invalid
        reason: 'Test',
        updatedBy: testNurseId,
      };

      return request(app.getHttpServer())
        .patch(`/triage/${createdTriageId}/priority`)
        .send(updatePriorityDto)
        .expect(400);
    });
  });

  describe('Vital Signs', () => {
    it('/triage/:id/vital-signs (POST) - should add new vital signs to triage', () => {
      const vitalSignsDto = {
        temperature: 36.8,
        bloodPressure: '118/78',
        heartRate: 72,
        respiratoryRate: 16,
        oxygenSaturation: 99,
        additionalNotes: 'Follow-up measurement',
      };

      return request(app.getHttpServer())
        .post(`/triage/${createdTriageId}/vital-signs`)
        .send(vitalSignsDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.triageId).toBe(createdTriageId);
          expect(res.body.temperature).toBe(36.8);
          expect(res.body.heartRate).toBe(72);
        });
    });

    it('/triage/:id/vital-signs (GET) - should retrieve vital signs by triage ID', () => {
      return request(app.getHttpServer())
        .get(`/triage/${createdTriageId}/vital-signs`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.vitalSigns).toBeDefined();
          expect(res.body.vitalSigns.triageId).toBe(createdTriageId);
        });
    });

    it('/triage/vital-signs/:vitalSignsId (GET) - should retrieve vital signs by ID', () => {
      return request(app.getHttpServer())
        .get(`/triage/vital-signs/${createdVitalSignsId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.vitalSigns.vitalSignsId).toBe(createdVitalSignsId);
        });
    });

    it('/triage/:id/vital-signs (POST) - should fail when triage does not exist', () => {
      const vitalSignsDto = {
        temperature: 36.8,
        bloodPressure: '120/80',
        heartRate: 75,
        respiratoryRate: 16,
        oxygenSaturation: 98,
      };

      return request(app.getHttpServer())
        .post('/triage/999999/vital-signs')
        .send(vitalSignsDto)
        .expect(404);
    });
  });

  describe('Queue Management', () => {
    it('/triage/queue (GET) - should list all patients in queue', () => {
      return request(app.getHttpServer())
        .get('/triage/queue')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('patients');
          expect(res.body).toHaveProperty('totalCount');
          expect(res.body).toHaveProperty('urgencyLevelCounts');
          expect(Array.isArray(res.body.patients)).toBe(true);
        });
    });

    it('/triage/queue?urgencyLevel=1 (GET) - should filter by urgency level', () => {
      return request(app.getHttpServer())
        .get('/triage/queue?urgencyLevel=1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('patients');
          if (res.body.patients.length > 0) {
            expect(res.body.patients[0].urgencyLevel).toBe(1);
          }
        });
    });

    it('/triage/queue?includeAllLevels=true (GET) - should include all levels summary', () => {
      return request(app.getHttpServer())
        .get('/triage/queue?includeAllLevels=true')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('urgencyLevelCounts');
          expect(res.body.urgencyLevelCounts).toHaveProperty('level1');
          expect(res.body.urgencyLevelCounts).toHaveProperty('level2');
          expect(res.body.urgencyLevelCounts).toHaveProperty('level3');
          expect(res.body.urgencyLevelCounts).toHaveProperty('level4');
          expect(res.body.urgencyLevelCounts).toHaveProperty('level5');
        });
    });
  });

  describe('Statistics', () => {
    it('/triage/stats (GET) - should return triage statistics', () => {
      return request(app.getHttpServer())
        .get('/triage/stats')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('totalPatients');
          expect(res.body).toHaveProperty('urgencyLevelCounts');
          expect(res.body).toHaveProperty('success', true);
          expect(typeof res.body.totalPatients).toBe('number');
        });
    });
  });

  describe('Delete Triage', () => {
    it('/triage/:id (DELETE) - should delete triage entry', () => {
      const deleteDto = {
        userId: testNurseId,
        reason: 'Patient discharged',
      };

      return request(app.getHttpServer())
        .delete(`/triage/${createdTriageId}`)
        .send(deleteDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toContain('exitosamente');
          expect(res.body.deletedTriageId).toBe(createdTriageId);
        });
    });

    it('/triage/:id (DELETE) - should fail when triage does not exist', () => {
      const deleteDto = {
        userId: testNurseId,
        reason: 'Test',
      };

      return request(app.getHttpServer())
        .delete('/triage/999999')
        .send(deleteDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('no encontrado');
        });
    });

    it('/triage/:id (DELETE) - should fail with missing required fields', () => {
      return request(app.getHttpServer())
        .delete(`/triage/${createdTriageId}`)
        .send({}) // Missing userId
        .expect(400);
    });
  });

  describe('Validation', () => {
    it('should reject request with extra fields when forbidNonWhitelisted is true', () => {
      const invalidDto = {
        patientId: testPatientId,
        nurseId: testNurseId,
        urgencyLevel: 3,
        initialObservations: 'Test',
        extraField: 'This should not be allowed', // Extra field
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(invalidDto)
        .expect(400);
    });

    it('should reject request with missing required fields', () => {
      const invalidDto = {
        patientId: testPatientId,
        // Missing nurseId
        urgencyLevel: 3,
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(invalidDto)
        .expect(400);
    });

    it('should reject request with invalid data types', () => {
      const invalidDto = {
        patientId: 'not-a-number', // Should be number
        nurseId: testNurseId,
        urgencyLevel: 3,
      };

      return request(app.getHttpServer())
        .post('/triage')
        .send(invalidDto)
        .expect(400);
    });
  });
});
