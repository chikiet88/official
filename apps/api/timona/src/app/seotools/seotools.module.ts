import { Module } from '@nestjs/common';
import { SeotoolsService } from './seotools.service';
import { SeotoolsController } from './seotools.controller';

@Module({
  controllers: [SeotoolsController],
  providers: [SeotoolsService]
})
export class SeotoolsModule {}
