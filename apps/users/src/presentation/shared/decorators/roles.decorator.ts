import { SetMetadata } from '@nestjs/common';
import type { Role } from 'apps/users/src/domain/entities/role.entity';

export type RoleName = Role['name'];

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleName[]) =>
  SetMetadata(ROLES_KEY, roles);
