import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import {
  IUsersServiceClient,
  UserDto,
} from '../../application/ports/users-service.client.port';

/**
 * HTTP Adapter for Users Service
 * Implements IUsersServiceClient using HTTP/REST
 */
@Injectable()
export class UsersServiceHttpClient implements IUsersServiceClient {
  private readonly logger = new Logger(UsersServiceHttpClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'USERS_SERVICE_URL',
      'http://users:3000',
    );
    this.timeout = this.configService.get<number>('HTTP_CLIENT_TIMEOUT', 5000);

    this.logger.log(
      `UsersServiceHttpClient initialized with baseUrl: ${this.baseUrl}`,
    );
  }

  /**
   * Get user details by ID
   */
  async getUserById(userId: number): Promise<UserDto | null> {
    try {
      this.logger.debug(`Fetching user details: ${userId}`);

      const response = await firstValueFrom(
        this.httpService
          .get<UserDto>(`${this.baseUrl}/users/${userId}`, {
            timeout: this.timeout,
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 404) {
                this.logger.debug(`User not found: ${userId}`);
                throw new Error('NOT_FOUND');
              }
              throw error;
            }),
          ),
      );

      if (response.status === 404 || !response.data) {
        return null;
      }

      this.logger.debug(`User fetched successfully: ${response.data.username}`);

      return response.data;
    } catch (error) {
      if (error instanceof Error && error.message === 'NOT_FOUND') {
        return null;
      }
      const err = error as Error;
      this.logger.error(`Error fetching user: ${userId}`, err.stack);
      throw new Error(`Failed to fetch user: ${err.message}`);
    }
  }

  /**
   * Check if user has a specific role
   * @param userId - User identifier
   * @param roleId - Role ID (1=ADMIN, 2=DOCTOR, 3=NURSE, 4=RECEPTIONIST)
   */
  async userHasRole(userId: number, roleId: number): Promise<boolean> {
    try {
      this.logger.debug(`Checking if user ${userId} has roleId: ${roleId}`);

      const user = await this.getUserById(userId);

      if (!user) {
        this.logger.debug(`User not found: ${userId}`);
        return false;
      }

      const hasRole = user.roleId === roleId;
      this.logger.debug(`User ${userId} has roleId ${roleId}: ${hasRole}`);

      return hasRole;
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error checking user role: ${userId}, roleId: ${roleId}`,
        err.stack,
      );
      throw new Error(`Failed to check user role: ${err.message}`);
    }
  }

  /**
   * Check if user is active (status === 'active')
   */
  async isUserActive(userId: number): Promise<boolean> {
    try {
      this.logger.debug(`Checking if user is active: ${userId}`);

      const user = await this.getUserById(userId);

      if (!user) {
        this.logger.debug(`User not found: ${userId}`);
        return false;
      }

      const isActive = user.status === 'active';
      this.logger.debug(
        `User ${userId} is active: ${isActive} (status: ${user.status})`,
      );

      return isActive;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error checking user status: ${userId}`, err.stack);
      throw new Error(`Failed to check user status: ${err.message}`);
    }
  }
}
