export class Role {
  constructor(
    public readonly roleId: string,
    public readonly name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient',
    public readonly permissions: string[],
  ) {}

  static create(
    roleId: string,
    name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient',
    permissions: string[] = [],
  ): Role {
    return new Role(roleId, name, permissions);
  }

  addPermission(permission: string): Role {
    const updatedPermissions = [...this.permissions, permission];
    return new Role(this.roleId, this.name, updatedPermissions);
  }

  removePermission(permission: string): Role {
    const updatedPermissions = this.permissions.filter((p) => p !== permission);
    return new Role(this.roleId, this.name, updatedPermissions);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
