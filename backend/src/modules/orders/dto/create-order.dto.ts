import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsString()
  order?: ObjectId;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => OrderItemDto)
  items: string[];

  @ApiProperty()
  @IsString()
  buyer: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty()
  @IsString()
  seller: string;

  @ApiProperty()
  @Min(0)
  @Max(1)
  @IsNumber()
  discount: number;
}
