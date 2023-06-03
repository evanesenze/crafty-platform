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
import { Product } from './schemas/product.schema';

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
  @ApiQuery({ name: 'categoryId', required: false, type: 'string' })
  async findAll(
    @Query('q') query: string,
    @Query('ownerId') ownerId: string,
    @Query('categoryId') categoryId: string,
  ) {
    if (query) {
      return this.productsService.search({ query });
    }
    if (ownerId) {
      return await this.productsService.findAll({ owner: ownerId }, 'category');
    } else if (categoryId) {
      console.log('categoryId', categoryId);
      return await this.productsService.findAll(
        { category: categoryId },
        'category',
      );
    } else {
      return await this.productsService.findAll({}, 'category');
    }
  }

  @Get('recommendations')
  getRecommendations() {
    return this.productsService.getRecommendations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id, 'category');
  }

  @Get('with-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findOne({ slug }, 'category');
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
