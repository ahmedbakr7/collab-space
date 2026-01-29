import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetOrganizationUseCase } from '../../application/use-cases/get-organization.use-case';

@Injectable()
export class OrganizationExistsInterceptor implements NestInterceptor {
  constructor(
    private readonly getOrganizationUseCase: GetOrganizationUseCase,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const orgId = request.params.orgId;

    if (!orgId) {
      // If no orgId in params, validation is skipped (or validation pipe handles it if mandatory)
      // This allows the interceptor to be used on routes where orgId might be optional or absent (though typically used on routes where it's present)
      return next.handle();
    }

    // Optional: Validate UUID format if not already done by Pipe
    // But typically Pipes run before Interceptors?
    // Actually, Interceptors run BEFORE Pipes? No, Pipes run before handlers but Interceptors wrap the handler.
    // "Interceptors... bind extra logic before / after the method execution."
    // "Pipes... transformation / validation."
    // Execution order: Middleware -> Guards -> Interceptors (Pre) -> Pipes -> Controller -> Interceptors (Post) -> Filters.
    // So Interceptor (Pre) runs BEFORE Pipes.
    // So we might need to validate UUID structure here if we want to avoid crashing the UseCase or just checking validity.

    // However, if we put a ValidationPipe on the Param, that Pipe runs AFTER the Interceptor logic?
    // Wait. NestJS docs:
    // 1. Incoming request
    // 2. Middleware
    // 3. Guards
    // 4. Interceptors (Process Request / Pre-Controller)
    // 5. Pipes
    // 6. Route Handler

    // So if I read request.params.orgId here, it works.

    const organization = await this.getOrganizationUseCase.execute(orgId);

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${orgId} not found`);
    }

    // Attach to request
    request.organization = organization;

    return next.handle();
  }
}
