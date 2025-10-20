import { Test, TestingModule } from '@nestjs/testing';
import { EhrController } from './ehr.controller';
import { EhrService } from '../../application/services/ehr.service';

describe('EhrController', () => {
  let ehrController: EhrController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EhrController],
      providers: [EhrService],
    }).compile();

    ehrController = app.get<EhrController>(EhrController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ehrController.getHello()).toBe('Hello World!');
    });
  });
});
