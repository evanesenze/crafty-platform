import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  @Prop()
  name: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  email: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  wallet: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  type: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  basket: string;
}
