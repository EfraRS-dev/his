import { ManageUserProfileDto } from '../dto/manage-user-profile.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

export class ManageUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: ManageUserProfileDto): Promise<User> {
    // 1. Buscar usuario
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Actualizar solo los campos permitidos
    const updatedUser = new User(
      user.userId,
      dto.username ?? user.username,
      user.passwordHash, // no se toca aquí
      dto.roleId ?? user.roleId,
      dto.email ?? user.email,
      user.status, // no se toca aquí
      user.jwtToken,
      user.createdAt,
    );

    // 3. Guardar usuario actualizado
    await this.userRepository.save(updatedUser);

    return updatedUser;
  }
}
