import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, it, beforeEach, expect } from '@jest/globals';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthServiceInterface } from '../src/features/auth/application/ports/auth.service.interface';
import { AuthUser } from '../src/features/auth/domain/entities/auth-user.entity';
import { AuthSession } from '../src/features/auth/domain/entities/auth-session.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('AuthServiceInterface')
      .useValue(mockAuthService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const mockUser = new AuthUser('123', 'test@example.com', true, {});
  const mockSession = new AuthSession(
    'access-token',
    'refresh-token',
    3600,
    'bearer',
  );

  it('/auth/register (POST)', () => {
    mockAuthService.register.mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password',
        data: { name: 'Test' },
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.user.id).toBe('123');
        expect(res.body.session.accessToken).toBe('access-token');
      });
  });

  it('/auth/login (POST)', () => {
    mockAuthService.login.mockResolvedValue({
      user: mockUser,
      session: mockSession,
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)
      .expect((res) => {
        expect(res.body.user.id).toBe('123');
        expect(res.body.session.accessToken).toBe('access-token');
      });
  });

  it('/auth/logout (POST)', () => {
    mockAuthService.logout.mockResolvedValue(undefined);

    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', 'Bearer access-token')
      .expect(200)
      .expect({ message: 'Logged out successfully' });
  });
});
