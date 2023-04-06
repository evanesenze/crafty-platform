import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @ApiProperty()
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  product: string;

}
