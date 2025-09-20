export interface QueryUserCommand {
  searchTerm: string; // Can be document, name, or ID
  searchType?: 'document' | 'name' | 'id' | 'email';
}

export interface UserResult {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
}

export class QueryUserUseCase {
  constructor(
    private readonly userRepository: any, // Replace with proper interface
    private readonly roleRepository: any, // Replace with proper interface
  ) {}

  async execute(command: QueryUserCommand): Promise<UserResult[]> {
    let users: any[];
    
    switch (command.searchType) {
      case 'id':
        const userById = await this.userRepository.findById(command.searchTerm);
        users = userById ? [userById] : [];
        break;
      case 'email':
        const userByEmail = await this.userRepository.findByEmail(command.searchTerm);
        users = userByEmail ? [userByEmail] : [];
        break;
      case 'name':
        users = await this.userRepository.findByUsername(command.searchTerm);
        break;
      case 'document':
        // For MVP, document search might be in a separate user profile service
        users = await this.userRepository.findByDocument(command.searchTerm);
        break;
      default:
        // Auto-detect search type and search across all fields
        users = await this.searchAcrossFields(command.searchTerm);
        break;
    }
    
    // Enrich with role information
    const results: UserResult[] = [];
    for (const user of users) {
      const role = await this.roleRepository.findById(user.roleId);
      results.push({
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: role ? role.name : 'Unknown',
        status: user.status,
        createdAt: user.createdAt,
      });
    }
    
    return results;
  }
  
  private async searchAcrossFields(searchTerm: string): Promise<any[]> {
    // Try different search strategies
    const searches = await Promise.allSettled([
      this.userRepository.findById(searchTerm),
      this.userRepository.findByEmail(searchTerm),
      this.userRepository.findByUsername(searchTerm),
    ]);
    
    const results: any[] = [];
    searches.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        if (Array.isArray(result.value)) {
          results.push(...result.value);
        } else {
          results.push(result.value);
        }
      }
    });
    
    // Remove duplicates based on userId
    const unique = results.filter((user, index, self) => 
      index === self.findIndex(u => u.userId === user.userId)
    );
    
    return unique;
  }
}