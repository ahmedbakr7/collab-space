import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../app.error';
import * as crypto from 'crypto';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppErrorFilter.name);

  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const correlationId = crypto.randomUUID();

    this.logger.error(
      `AppError: ${exception.message}`,
      exception.stack,
      correlationId,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'USER_ALREADY_EXISTS':
        status = HttpStatus.CONFLICT;
        break;
      case 'USER_NOT_FOUND':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'INVALID_USER_DATA':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'ORGANIZATION_NOT_FOUND':
      case 'PROJECT_NOT_FOUND':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'ORGANIZATION_ALREADY_EXISTS':
      case 'PROJECT_ALREADY_EXISTS':
        status = HttpStatus.CONFLICT;
        break;
      default:
        status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      code: exception.code,
      message: exception.message,
      correlationId,
    });
  }
}
