import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersService } from './application/services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
