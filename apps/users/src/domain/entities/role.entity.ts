export class Role {
  constructor(
    public readonly roleId: number,
    public readonly name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient',
    public readonly permissions?: string[],
  ) {}
}
