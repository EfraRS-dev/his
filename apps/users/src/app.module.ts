import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './presentation/users.module';
import { RolesModule } from './presentation/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}

