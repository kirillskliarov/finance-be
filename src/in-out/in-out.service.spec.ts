import { Test, TestingModule } from '@nestjs/testing';
import { InOutService } from './in-out.service';

describe('InOutService', () => {
  let service: InOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InOutService],
    }).compile();

    service = module.get<InOutService>(InOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
