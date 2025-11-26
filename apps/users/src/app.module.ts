import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './presentation/modules/users.module';
import { RolesModule } from './presentation/modules/roles.module';
import * as path from "path"
@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true
     }),
    UsersModule,RolesModule
  ],
})
export class AppModule {}
