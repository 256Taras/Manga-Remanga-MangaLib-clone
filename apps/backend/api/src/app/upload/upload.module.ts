import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';

@Module({
  providers:[UploadService],
  exports:[UploadService]
})
export class UploadModule {}
