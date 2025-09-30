import { User } from '../entities/user.entity';

export interface UserRepository {
  /**
   * Guarda un nuevo usuario o actualiza uno existente.
   */
  save(user: User): Promise<User>;

  /**
   * Busca un usuario por su ID único.
   */
  findById(userId: number): Promise<User | null>;

  /**
   * Busca un usuario por su nombre de usuario.
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Busca un usuario por su correo electrónico.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Retorna todos los usuarios (opcional, para administración).
   */
  findAll(): Promise<User[]>;

  /**
   * Elimina un usuario por su ID.
   */
  delete(userId: number): Promise<void>;


  /**
   * Generar un nuevo ID único para un usuario.
   */
    generateUserId(): Promise<number>;

    passwordHash(password: string): Promise<string>;
}
