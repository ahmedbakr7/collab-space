import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SyncUserAvatarUseCase } from '../../../user/application/use-cases/sync-user-avatar.use-case';
import { AuthUser } from '@repo/domain';

@Injectable()
export class AvatarSyncInterceptor implements NestInterceptor {
  constructor(private readonly syncUserAvatarUseCase: SyncUserAvatarUseCase) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;

    if (user) {
      // Execute sync in background (fire and forget), or await it?
      // Prompt says: "Detects first authenticated request... No flags... Fetch user from public.users... Normalizes avatar"
      // Ideally we shouldn't block response too much, but for "First Request Detection" it implies we should check.
      // Since it's clean arch, UseCase handles logic.
      // We can just call it and not await? Or await.
      // Awaiting ensures consistent state for the request handling if controller relies on it.
      // But interceptors wrap the stream.
      // If we want to run BEFORE controller, we should do it before `next.handle()`.

      // Async execution without awaiting might lead to race conditions if controller reads DB immediately.
      // However, controller reads from DB (User Entity).
      // If we want the controller to see the synced avatar, we MUST await.

      // But `intercept` returns `Observable`. To await async work before next.handle(),
      // we need to wrap it in `from(promise).pipe(...)`.
      // Or just call it if we don't care about blocking.

      // Given NestJS, usually Interceptors can be async if they return Promise<Observable>.
      // Let's try async implementation.

      return new Observable((observer) => {
        this.syncUserAvatarUseCase
          .execute(user.id, user)
          .then(() => {
            next.handle().subscribe(observer);
          })
          .catch((err) => {
            // Log error but allow request to proceed?
            // UseCase already catches errors.
            next.handle().subscribe(observer);
          });
      });
    }

    return next.handle();
  }
}
