import { NestFactory } from '@nestjs/core';
import { AppErrorFilter } from './shared/filters/app-error.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppErrorFilter());
  app.enableCors();
  await app.listen(3000);
}

// Force restart again
void bootstrap();
