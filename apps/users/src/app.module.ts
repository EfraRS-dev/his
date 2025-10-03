import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './presentation/modules/users.module';
import { join } from 'path';
import { RolesModule } from './presentation/modules/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      
     }),
    UsersModule,RolesModule
  ],
})
export class AppModule {}
