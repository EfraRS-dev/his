import { Injectable } from '@nestjs/common';

@Injectable()
export class EhrService {
  getHello(): string {
    return 'Hello World!';
  }
}
