import { ApiProperty } from '@nestjs/swagger';

export class CommonSchema {
  @ApiProperty()
  id: string;
}