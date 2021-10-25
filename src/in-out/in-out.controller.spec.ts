import { Test, TestingModule } from '@nestjs/testing';
import { InOutController } from './in-out.controller';

describe('InOutController', () => {
  let controller: InOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InOutController],
    }).compile();

    controller = module.get<InOutController>(InOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
