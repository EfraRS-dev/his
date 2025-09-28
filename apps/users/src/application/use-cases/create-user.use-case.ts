import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RoleRepository } from '../../domain/repositories/role.repository';

// Interfaz para el servicio de hashing de contraseñas
export interface PasswordHashService {
  hash(password: string): Promise<string>;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly passwordHashService: PasswordHashService,
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
    const passwordHash = await this.passwordHashService.hash(dto.password);

    // 5. Crear el usuario usando el factory method de la entidad
    const userId = this.generateUserId();
    const user = User.create(
      userId,
      dto.username,
      passwordHash,
      role.roleId, // 🔑 usamos el roleId del Role encontrado
      dto.email,
      'active',
    );

    // 6. Guardar en el repositorio
    await this.userRepository.save(user);

    // 7. Retornar el usuario creado (puedes mapearlo a un DTO de salida si prefieres)
    return user;
  }

  private generateUserId(): number {
    return this.userRepository.generateUserId();
  }
}

