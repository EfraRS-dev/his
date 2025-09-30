import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { Role } from '../../domain/entities/role.entity';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(role: Role): Promise<void> {
    await this.prisma.role.upsert({
      where: { roleId: role.roleId },
      update: {
        name: role.name,
        permissions: role.permissions,
      },
      create: {
        roleId: role.roleId,
        name: role.name,
        permissions: role.permissions,
      },
    });
  }

  async findById(roleId: number): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { roleId },
    });
    
    if (!role) return null;
    
    return new Role(
      role.roleId, 
      role.name, 
      Array.isArray(role.permissions) ? role.permissions as string[] : []
    );
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });
    
    if (!role) return null;
    
    return new Role(
      role.roleId, 
      role.name, 
      Array.isArray(role.permissions) ? role.permissions as string[] : []
    );
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      orderBy: { roleId: 'asc' },
    });
    
    return roles.map(r => new Role(
      r.roleId, 
      r.name, 
      Array.isArray(r.permissions) ? r.permissions as string[] : []
    ));
  }

  async delete(roleId: number): Promise<void> {
    await this.prisma.role.delete({
      where: { roleId },
    });
  }
}
