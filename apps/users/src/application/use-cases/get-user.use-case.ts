import { GetUserDto } from '../dto/get-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: GetUserDto): Promise<UserResponseDto> {
    let user: User | null = null;

    // 1. Buscar según el criterio
    switch (dto.criteria) {
      case 'id':
        if (!dto.userId) {
          throw new Error('Debe proporcionar el userId para criterio "id"');
        }
        user = await this.userRepository.findById(dto.userId);
        break;

      case 'name':
        if (!dto.username) {
          throw new Error('Debe proporcionar el username para criterio "name"');
        }
        user = await this.userRepository.findByUsername(dto.username);
        break;

      default:
        throw new Error(`Criterio de búsqueda no soportado: ${dto.criteria}`);
    }

    // 2. Validar si existe
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 3. Retornar DTO de salida
    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.roleId,
      status: user.status,
      createdAt: user.createdAt ?? new Date(),
    };
  }
}




//es una busqueda secuencial debo cambiarlo - el nombre y el apellido he de agregarlos 
