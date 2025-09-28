
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

export class DisableUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(UserId:number): Promise<User> {
    // 1. Buscar usuario
    const user = await this.userRepository.findById(UserId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Validar estado actual
    if (user.status === 'inactive' || user.status === 'blocked') {
      throw new Error(`El usuario ya está ${user.status}`);
    }

    // 3. Cambiar estado a inactivo usando método de la entidad
    const disabledUser = user.deactivate();

    // 4. Guardar cambios
    await this.userRepository.save(disabledUser);

    return disabledUser;
  }
}
