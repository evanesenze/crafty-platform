import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator"

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
}


export class CreateOrderDto {

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]

  @ApiProperty()
  @IsString()
  buyer: string;

  @ApiProperty()
  @IsString()
  seller: string;

  @ApiProperty()
  @Min(0)
  @Max(1)
  @IsNumber()
  discount: number;

}
