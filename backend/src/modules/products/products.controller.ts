import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'ownerId', required: false, type: 'string' })
  async findAll(@Query('q') query: string, @Query('ownerId') ownerId: string) {
    if (query) return this.productsService.search({ query });
    if (ownerId)
      return this.productsService.findAll({ owner: ownerId }, 'category');
    return this.productsService.findAll({}, 'category');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id, 'category');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
