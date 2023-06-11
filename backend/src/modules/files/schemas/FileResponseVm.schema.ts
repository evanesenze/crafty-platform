import { ApiProperty } from '@nestjs/swagger';
import { FileInfoVm } from './FileInfoVm.schema';

export class FileResponseVm {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: FileInfoVm })
  file: FileInfoVm;
}
