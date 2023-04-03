import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  avatar?: string;
}
