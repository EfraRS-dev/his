import { Module } from "@nestjs/common";
import { EhrModule } from "./presentation/ehr.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EhrModule,
  ],
})
export class AppModule {}