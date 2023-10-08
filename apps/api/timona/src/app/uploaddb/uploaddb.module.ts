import { Module } from '@nestjs/common';
import { UploaddbService } from './uploaddb.service';
import { UploaddbController } from './uploaddb.controller';

@Module({
  controllers: [UploaddbController],
  providers: [UploaddbService]
})
export class UploaddbModule {}
