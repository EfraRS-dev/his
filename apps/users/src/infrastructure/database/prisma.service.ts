import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // se conecta automáticamente al iniciar el módulo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // cierra la conexión cuando se apaga la app
  }
}
