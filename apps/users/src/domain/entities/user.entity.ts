export class User {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly roleId: string,
    public readonly email: string,
    public readonly status: 'active' | 'inactive' | 'blocked',
    public readonly jwtToken?: string,
    public readonly createdAt?: Date,
  ) {}

  static create(
    userId: string,
    username: string,
    passwordHash: string,
    roleId: string,
    email: string,
    status: 'active' | 'inactive' | 'blocked' = 'active',
  ): User {
    return new User(
      userId,
      username,
      passwordHash,
      roleId,
      email,
      status,
      undefined,
      new Date(),
    );
  }

  updateToken(jwtToken: string): User {
    return new User(
      this.userId,
      this.username,
      this.passwordHash,
      this.roleId,
      this.email,
      this.status,
      jwtToken,
      this.createdAt,
    );
  }

  deactivate(): User {
    return new User(
      this.userId,
      this.username,
      this.passwordHash,
      this.roleId,
      this.email,
      'inactive',
      this.jwtToken,
      this.createdAt,
    );
  }

  block(): User {
    return new User(
      this.userId,
      this.username,
      this.passwordHash,
      this.roleId,
      this.email,
      'blocked',
      this.jwtToken,
      this.createdAt,
    );
  }
}
