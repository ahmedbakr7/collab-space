import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';

@Module({
  imports: [UsersModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
