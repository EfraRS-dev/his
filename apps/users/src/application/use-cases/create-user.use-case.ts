import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { RoleRepository } from '../../domain/repositories/role.repository';
import { ROLE_REPOSITORY, USER_REPOSITORY } from '../tokens';

// Interfaz para el servicio de hashing de contraseñas
export interface PasswordHashService {
  hash(password: string): Promise<string>;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: RoleRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // 1. Verificar que el username no exista
    const existingUserByUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // 2. Verificar que el email no exista
    const existingUserByEmail = await this.userRepository.findByEmail(dto.email);
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }

    // 3. Verificar que el rol exista
    const role = await this.roleRepository.findByName(dto.role);
    if (!role) {
      throw new Error(`Role ${dto.role} not found`);
    }

    // 4. Hashear la contraseña
    const passwordHash = await this.userRepository.passwordHash(dto.password);

    // 5. Crear el usuario usando el factory method de la entidad
    const userId = await this.generateUserId();
    const user = User.create(
      userId,
      dto.username,
      passwordHash,
      role.roleId,
      dto.email,
      'active',
    );

    // 6. Guardar en el repositorio
    await this.userRepository.save(user);

    return user;
  }

  private generateUserId(): Promise<number> {
    return this.userRepository.generateUserId();
  }
}


