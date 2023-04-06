import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];
}
