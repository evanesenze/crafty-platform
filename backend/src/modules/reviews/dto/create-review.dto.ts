import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateReviewDto {
  @ApiProperty()
  @Prop()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @Prop()
  text: string;

  @ApiProperty()
  @Prop()
  productId: string;

}
