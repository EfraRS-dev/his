import { Test, TestingModule } from '@nestjs/testing';
import { TriageController } from './triage.controller';
import { TriageService } from '../../application/services/triage.service';

describe('TriageController', () => {
  let triageController: TriageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TriageController],
      providers: [TriageService],
    }).compile();

    triageController = app.get<TriageController>(TriageController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(triageController.getHello()).toBe('Hello World!');
    });
  });
});
