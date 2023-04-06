import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @ApiProperty()
  @Prop()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiProperty()
  @Prop()
  @IsOptional()
  @IsString()
  perPage?: string;
}