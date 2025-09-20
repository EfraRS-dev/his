export interface RegisterUserCommand {
  username: string;
  password: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Patient';
  firstName?: string;
  lastName?: string;
}

export interface RegisterUserResult {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: any, // Replace with proper interface
    private readonly passwordHashService: any, // Replace with proper interface
    private readonly roleRepository: any, // Replace with proper interface
  ) {}

  async execute(command: RegisterUserCommand): Promise<RegisterUserResult> {
    // Hash the password
    const passwordHash = await this.passwordHashService.hash(command.password);
    
    // Generate user ID
    const userId = this.generateUserId();
    
    // Get role ID by role name
    const role = await this.roleRepository.findByName(command.role);
    if (!role) {
      throw new Error(`Role ${command.role} not found`);
    }
    
    // Create user domain entity
    const user = {
      userId,
      username: command.username,
      passwordHash,
      roleId: role.roleId,
      email: command.email,
      status: 'active' as const,
      createdAt: new Date(),
    };
    
    // Save user
    await this.userRepository.save(user);
    
    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: command.role,
      status: user.status,
      createdAt: user.createdAt,
    };
  }
  
  private generateUserId(): string {
    // Simple UUID generation - replace with proper UUID library
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }
}