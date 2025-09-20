export interface DisableUserCommand {
  userId: string;
  reason?: string;
  disabledBy: string; // Admin user ID who performs the action
}

export interface DisableUserResult {
  userId: string;
  username: string;
  previousStatus: 'active' | 'inactive' | 'blocked';
  newStatus: 'inactive' | 'blocked';
  disabledAt: Date;
  disabledBy: string;
  reason?: string;
  success: boolean;
  message: string;
}

export class DisableUserUseCase {
  constructor(
    private readonly userRepository: any, // Replace with proper interface
  ) {}

  async execute(command: DisableUserCommand): Promise<DisableUserResult> {
    // Find the user to disable
    const existingUser = await this.userRepository.findById(command.userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if user is already inactive or blocked
    if (existingUser.status === 'inactive' || existingUser.status === 'blocked') {
      return {
        userId: command.userId,
        username: existingUser.username,
        previousStatus: existingUser.status,
        newStatus: existingUser.status,
        disabledAt: new Date(),
        disabledBy: command.disabledBy,
        reason: command.reason,
        success: false,
        message: `User is already ${existingUser.status}`,
      };
    }

    // Determine new status - default to 'blocked' for security
    const newStatus = 'blocked';

    // Update user status
    const updatedUser = {
      ...existingUser,
      status: newStatus,
      disabledAt: new Date(),
      disabledBy: command.disabledBy,
      disabledReason: command.reason,
      jwtToken: null, // Invalidate any existing tokens
    };

    await this.userRepository.update(command.userId, updatedUser);

    return {
      userId: updatedUser.userId,
      username: updatedUser.username,
      previousStatus: existingUser.status,
      newStatus: newStatus,
      disabledAt: updatedUser.disabledAt,
      disabledBy: command.disabledBy,
      reason: command.reason,
      success: true,
      message: 'User has been successfully disabled',
    };
  }
}