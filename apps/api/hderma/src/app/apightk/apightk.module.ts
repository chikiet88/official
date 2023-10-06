import { Module } from '@nestjs/common';
import { ApightkService } from './apightk.service';
import { ApightkController } from './apightk.controller';

@Module({
  controllers: [ApightkController],
  providers: [ApightkService]
})
export class ApightkModule {}
