import { Role } from '../entities/role.entity';

export interface RoleRepository {
  /**
   * Guarda un rol nuevo o actualiza uno existente.
   */
  save(role: Role): Promise<void>;

  /**
   * Busca un rol por su ID único.
   */
  findById(roleId: number): Promise<Role | null>;

  /**
   * Busca un rol por su nombre (Admin, Doctor, Nurse, Patient).
   */
  findByName(name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient'): Promise<Role | null>;

  /**
   * Retorna todos los roles disponibles.
   */
  findAll(): Promise<Role[]>;

  /**
   * Elimina un rol por su ID.
   */
  delete(roleId: number): Promise<void>;
}
