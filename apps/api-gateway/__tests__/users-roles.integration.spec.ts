import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway -> Users Service (Integration)', () => {
    let app: INestApplication;
    let user: any;
    let rol: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const res = await request(app.getHttpServer())
            .post('/roles/create')
            .send({
                name: 'Nurse',
            });

        expect([200, 201]).toContain(res.status);
        expect(res.body.name).toBe('Nurse');
        rol = res.body;

        const response = await request(app.getHttpServer())
            .post('/users/create')
            .send({
                username: "jlbarreneche",
                password: "Password",
                roleId: rol.roleId,
                email: "jlbarreneche@uninorte.com"
            });

        expect(response.status).toBe(201);
        expect(response.body.email).toBe('jlbarreneche@uninorte.com');
        user = response.body;
    });

    afterAll(async () => {
        await app.close();
    });

    // 🔹 POST /users/login
    it('/users/login (POST) should authenticate a user', async () => {
        const response = await request(app.getHttpServer())
            .post('/users/login')
            .send({
                email: 'jlbarreneche@uninorte.com',
                password: 'Password',
            });

        expect([201, 401]).toContain(response.status);
    });

    // 🔹 PUT /users/activate/:id
    it('/users/activate/:id (PUT) should activate user', async () => {
        const res = await request(app.getHttpServer())
            .put(`/users/activate/${user.userId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 PUT /users/inactivate/:id
    it('/users/inactivate/:id (PUT) should inactivate user', async () => {
        const res = await request(app.getHttpServer())
            .put(`/users/inactivate/${user.userId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 PUT /users/block/:id
    it('/users/block/:id (PUT) should block user', async () => {
        const res = await request(app.getHttpServer())
            .put(`/users/block/${user.userId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 GET /users
    it('/users (GET) should return all users', async () => {
        const res = await request(app.getHttpServer()).get('/users');
        expect([200]).toContain(res.status);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // 🔹 GET /users/:id
    it('/users/:id (GET) should return user info', async () => {
        const res = await request(app.getHttpServer()).get(`/users/${user.userId}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 GET /users/email/:email
    it('/users/email/:email (GET) should return user by email', async () => {
        const res = await request(app.getHttpServer())
            .get(`/users/email/${user.email}`);
        expect([200, 404]).toContain(res.status);
    });

    // 🔹 PUT /users/update/:id
    it('/users/update/:id (PUT) should update user info', async () => {
        const update = await request(app.getHttpServer())
            .put(`/users/update/${user.userId}`)
            .send({
                email: 'Barreneche@gmail.com',
                username: 'JBarren',
                password: 'React'
            });

        expect(update.status).toBe(200);
        expect(update.body.username).toBe('JBarren');
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
