import { Controller, Post, ForbiddenException } from '@nestjs/common';
import { TestService } from './test.service';
import { ConfigService } from '@nestjs/config';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly configService: ConfigService,
  ) {}

  @Post('reset')
  reset() {
    const env = this.configService.get<string>('NODE_ENV');

    if (env !== 'test') {
      throw new ForbiddenException('Reset allowed only in test environment');
    }

    return this.testService.resetDatabase();
  }
}
