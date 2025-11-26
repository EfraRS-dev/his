import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLE_REPOSITORY } from 'apps/users/src/application/tokens';
import type { RoleRepository } from 'apps/users/src/domain/repositories/role.repository.port';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Tu decorador envía strings, así que mantenemos string[]
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('User not authenticated');

    const rawRoleId = user.roleId;

    if (!rawRoleId) {
      throw new ForbiddenException('User token does not contain roleId');
    }

    // 🔥 ARREGLA el error de Prisma:
    // rawRoleId viene como string desde el JWT — lo convertimos a number.
    const roleId = Number(rawRoleId);

    if (isNaN(roleId)) {
      throw new ForbiddenException('Invalid roleId in token');
    }

    // Consulta del rol en BD usando Int
    const role = await this.roleRepo.findRoleById(roleId);

    if (!role) {
      throw new ForbiddenException('Role not found in database');
    }

    // Name del rol retornado por tu entidad:
    // 'Admin' | 'Doctor' | 'Nurse' | 'Patient'
    const userRoleName = role.name;

    // Comparar por nombre del rol
    const hasRole = requiredRoles.includes(userRoleName);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
