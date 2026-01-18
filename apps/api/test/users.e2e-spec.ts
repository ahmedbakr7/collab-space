import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, beforeAll, afterAll, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/infrastructure/prisma/prisma.service';
import { CreateUserDto } from './../src/features/user/presentation/dtos/create-user.dto';
import { AppErrorFilter } from './../src/shared/filters/app-error.filter';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    jest.setTimeout(60000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AppErrorFilter());
    await app.init();

    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Optional: Clean up created data
    // await prismaService.user.deleteMany({ where: { email: { contains: 'e2e' } } });
    await app.close();
  });

  const testUser: CreateUserDto = {
    email: `test-e2e-${Date.now()}@example.com`,
    name: 'E2E Test User',
    password: 'password123',
  };

  let createdUserId: string;

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.name).toBe(testUser.name);
    // passwordHash shouldn't be returned strictly speaking but let's check what the entity returns
    // The current implementation returns the whole User entity which includes passwordHash (bad practice generally but verified in code)

    createdUserId = response.body.id;
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const found = response.body.find((u: any) => u.id === createdUserId);
    expect(found).toBeDefined();
    expect(found.email).toBe(testUser.email);
  });

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);

    expect(response.body.id).toBe(createdUserId);
    expect(response.body.email).toBe(testUser.email);
  });

  it('/users/:id - not found (GET)', async () => {
    await request(app.getHttpServer())
      .get('/users/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });
});
