/**
 * Port (Interface) for Users Service Client
 * Defines contract for communication with Users microservice
 */
export interface IUsersServiceClient {
  /**
   * Get user details by ID
   * @param userId - User identifier
   * @returns Promise<UserDto | null> - User data or null if not found
   */
  getUserById(userId: number): Promise<UserDto | null>;

  /**
   * Check if user has a specific role
   * @param userId - User identifier
   * @param roleId - Role ID (1=ADMIN, 2=DOCTOR, 3=NURSE, 4=RECEPTIONIST)
   * @returns Promise<boolean> - true if user has the role, false otherwise
   */
  userHasRole(userId: number, roleId: number): Promise<boolean>;

  /**
   * Check if user is active (not inactive or blocked)
   * @param userId - User identifier
   * @returns Promise<boolean> - true if user status is 'active', false otherwise
   */
  isUserActive(userId: number): Promise<boolean>;
}

/**
 * User DTO returned from Users Service
 */
export interface UserDto {
  userId: number;
  username: string;
  email: string;
  roleId: number;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date | string;
}
