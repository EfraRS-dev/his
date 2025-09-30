import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../tokens';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class DisableUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const disabledUser = user.deactivate();
    await this.userRepository.save(disabledUser);

    return disabledUser;
  }
}

