import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users Validation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should return 400 with improved error when body is empty', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send() // Empty body
      .expect(400);

    // Current behavior (to be improved):
    // expect(response.body.message).toBe('Validation failed');
    // expect(response.body.errors.formErrors).toContain('Required');

    // Desired behavior (after fix):
    expect(response.body.message).toBe('Validation failed: body is required');
    expect(response.body.errors.formErrors).toContain('Required');
  });
});
