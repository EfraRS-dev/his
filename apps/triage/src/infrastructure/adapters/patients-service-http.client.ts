import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import {
  IPatientsServiceClient,
  PatientDto,
} from '../../application/ports/patients-service.client.port';

/**
 * HTTP Adapter for Patients Service
 * Implements IPatientsServiceClient using HTTP/REST
 */
@Injectable()
export class PatientsServiceHttpClient implements IPatientsServiceClient {
  private readonly logger = new Logger(PatientsServiceHttpClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'PATIENTS_SERVICE_URL',
      'http://patients-service:3000',
    );
    this.timeout = this.configService.get<number>('HTTP_CLIENT_TIMEOUT', 5000);

    this.logger.log(
      `PatientsServiceHttpClient initialized with baseUrl: ${this.baseUrl}`,
    );
  }

  /**
   * Check if a patient exists by ID
   */
  async patientExists(patientId: number): Promise<boolean> {
    try {
      this.logger.debug(`Checking if patient exists: ${patientId}`);

      const response = await firstValueFrom(
        this.httpService
          .get(`${this.baseUrl}/patients/${patientId}`, {
            timeout: this.timeout,
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 404) {
                this.logger.debug(`Patient not found: ${patientId}`);
                // Return a mock response for 404
                throw new Error('NOT_FOUND');
              }
              throw error;
            }),
          ),
      );

      const exists = response.status === 200 && response.data !== null;
      this.logger.debug(`Patient ${patientId} exists: ${exists}`);

      return exists;
    } catch (error) {
      if (error instanceof Error && error.message === 'NOT_FOUND') {
        return false;
      }
      const err = error as Error;
      this.logger.error(
        `Error checking patient existence: ${patientId}`,
        err.stack,
      );
      throw new Error(`Failed to verify patient existence: ${err.message}`);
    }
  }

  /**
   * Get patient details by ID
   */
  async getPatientById(patientId: number): Promise<PatientDto | null> {
    try {
      this.logger.debug(`Fetching patient details: ${patientId}`);

      const response = await firstValueFrom(
        this.httpService
          .get<PatientDto>(`${this.baseUrl}/patients/${patientId}`, {
            timeout: this.timeout,
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 404) {
                this.logger.debug(`Patient not found: ${patientId}`);
                throw new Error('NOT_FOUND');
              }
              throw error;
            }),
          ),
      );

      if (response.status === 404 || !response.data) {
        return null;
      }

      this.logger.debug(
        `Patient fetched successfully: ${response.data.firstName} ${response.data.lastName}`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error && error.message === 'NOT_FOUND') {
        return null;
      }
      const err = error as Error;
      this.logger.error(`Error fetching the patient: ${patientId}`, err.stack);
      throw new Error(`Failed to fetch patient: ${err.message}`);
    }
  }
}
