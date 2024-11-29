import { Test, TestingModule } from '@nestjs/testing';
import { ThirdParty } from './third-party';

describe('ThirdParty', () => {
  let provider: ThirdParty;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdParty],
    }).compile();

    provider = module.get<ThirdParty>(ThirdParty);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
