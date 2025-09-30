import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const saved = await this.prisma.user.upsert({
      where: { userId: user.userId },
      update: {
        username: user.username,
        passwordHash: user.passwordHash,
        roleId: user.roleId,
        email: user.email,
        status: user.status,
        jwtToken: user.jwtToken,
      },
      create: {
        userId: user.userId,
        username: user.username,
        passwordHash: user.passwordHash,
        roleId: user.roleId,
        email: user.email,
        status: user.status,
        jwtToken: user.jwtToken,
      },
    });

    return new User(
      saved.userId,
      saved.username,
      saved.passwordHash,
      saved.roleId,
      saved.email,
      saved.status,
      saved.jwtToken,
      saved.createdAt,
    );
  }

  async findById(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { userId } });
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.passwordHash,
      user.roleId,
      user.email,
      user.status,
      user.jwtToken,
      user.createdAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.passwordHash,
      user.roleId,
      user.email,
      user.status,
      user.jwtToken,
      user.createdAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.passwordHash,
      user.roleId,
      user.email,
      user.status,
      user.jwtToken,
      user.createdAt,
    );
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { userId: user.userId },
      data: {
        username: user.username,
        passwordHash: user.passwordHash,
        roleId: user.roleId,
        email: user.email,
        status: user.status,
        jwtToken: user.jwtToken,
      },
    });

    return new User(
      updated.userId,
      updated.username,
      updated.passwordHash,
      updated.roleId,
      updated.email,
      updated.status,
      updated.jwtToken,
      updated.createdAt,
    );
  }

  async generateUserId(): Promise<number> {
    const lastUser = await this.prisma.user.findFirst({
      orderBy: { userId: 'desc' },
    });

    return lastUser ? lastUser.userId + 1 : 1;
  }

  async passwordHash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

    async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (u) =>
        new User(
          u.userId,
          u.username,
          u.passwordHash,
          u.roleId,
          u.email,
          u.status,
          u.jwtToken,
          u.createdAt,
        ),
    );
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { userId },
    });
  }

}

