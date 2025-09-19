import { Injectable } from '@nestjs/common';

@Injectable()
export class TriageService {
  getHello(): string {
    return 'Hello World!';
  }
}
