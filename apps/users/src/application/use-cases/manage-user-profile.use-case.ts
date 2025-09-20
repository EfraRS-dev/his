export interface ManageUserProfileCommand {
  userId: string;
  email?: string;
  username?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ManageUserProfileResult {
  userId: string;
  username: string;
  email: string;
  updatedAt: Date;
  success: boolean;
  message: string;
}

export class ManageUserProfileUseCase {
  constructor(
    private readonly userRepository: any, // Replace with proper interface
    private readonly passwordHashService: any, // Replace with proper interface
  ) {}

  async execute(command: ManageUserProfileCommand): Promise<ManageUserProfileResult> {
    // Find existing user
    const existingUser = await this.userRepository.findById(command.userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate current password if changing password
    if (command.newPassword && command.currentPassword) {
      const isValidPassword = await this.passwordHashService.compare(
        command.currentPassword,
        existingUser.passwordHash,
      );
      if (!isValidPassword) {
        return {
          userId: command.userId,
          username: existingUser.username,
          email: existingUser.email,
          updatedAt: new Date(),
          success: false,
          message: 'Current password is incorrect',
        };
      }
    }

    // Check if email is already taken by another user
    if (command.email && command.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(command.email);
      if (emailExists && emailExists.userId !== command.userId) {
        return {
          userId: command.userId,
          username: existingUser.username,
          email: existingUser.email,
          updatedAt: new Date(),
          success: false,
          message: 'Email is already in use by another user',
        };
      }
    }

    // Check if username is already taken by another user
    if (command.username && command.username !== existingUser.username) {
      const usernameExists = await this.userRepository.findByUsername(command.username);
      if (usernameExists && usernameExists.userId !== command.userId) {
        return {
          userId: command.userId,
          username: existingUser.username,
          email: existingUser.email,
          updatedAt: new Date(),
          success: false,
          message: 'Username is already taken',
        };
      }
    }

    // Prepare updated user data
    const updatedUser = {
      ...existingUser,
      email: command.email || existingUser.email,
      username: command.username || existingUser.username,
      passwordHash: command.newPassword 
        ? await this.passwordHashService.hash(command.newPassword)
        : existingUser.passwordHash,
      updatedAt: new Date(),
    };

    // Save updated user
    await this.userRepository.update(command.userId, updatedUser);

    return {
      userId: updatedUser.userId,
      username: updatedUser.username,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt,
      success: true,
      message: 'Profile updated successfully',
    };
  }
}