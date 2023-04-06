import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/modules/pagination/pagination.dto";

export enum ProductSort {
  HIGHT_PRICE = 'HIGHT_PRICE',
  LOW_PRICE = 'LOW_PRICE',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST'
}

export class GetAllProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSort)
  sort?: ProductSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}