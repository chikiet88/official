import { Module } from '@nestjs/common';
import { ApinhanhService } from './apinhanh.service';
import { ApinhanhController } from './apinhanh.controller';

@Module({
  controllers: [ApinhanhController],
  providers: [ApinhanhService]
})
export class ApinhanhModule {}
