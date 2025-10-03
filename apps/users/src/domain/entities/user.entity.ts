export class User {
  constructor(
    public readonly userId: number | null,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly roleId: number,
    public readonly email: string,
    public readonly status: 'active' | 'inactive' | 'blocked',
    public readonly createdAt: Date,
    public readonly jwtToken?: string | null
  ) {}
}
