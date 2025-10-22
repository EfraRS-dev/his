import { Module } from '@nestjs/common';
import { GatewayModule } from './modules/gateway.module';
import { ConfigModule } from '@nestjs/config';
import * as path from "path"

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true
     }),
    GatewayModule
  ],
})
export class AppModule {}
