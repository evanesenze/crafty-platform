import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiQuery,
  ApiConsumes,
  ApiBody,
  ApiBodyOptions,
} from '@nestjs/swagger';
import { Product } from './schemas/product.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Auth } from '../auth/decortators/auth.decorator';
import { CurrentUser } from '../auth/decortators/user.decorator';

const options: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      images: {
        type: 'string',
        format: 'binary',
        maxItems: 8,
      },
    },
  },
};

type CreateBody = Omit<CreateProductDto, 'images' | 'price' | 'owner'> & {
  price: string;
};

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody(options)
  @UseInterceptors(FilesInterceptor('images', 8))
  @Auth()
  create(
    @Req() req: Request,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: CreateBody,
    @CurrentUser('id') userId: string,
  ) {
    if (!images?.length) throw new BadRequestException('Empty images array');
    const protocol = req.protocol;
    const host = req.get('Host');
    const url = `${protocol}://${host}/`;

    const data: CreateProductDto = {
      ...body,
      price: Number(body.price),
      images: images.map(({ filename }) => url + filename),
      owner: userId,
    };

    return this.productsService.createProduct(data);
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
      return await this.productsService
        .findAll({ owner: ownerId })
        .populate('category')
        .exec();
    } else if (categoryId) {
      console.log('categoryId', categoryId);
      return await this.productsService
        .findAll({ category: categoryId })
        .populate('category')
        .exec();
    } else {
      return await this.productsService.findAll({}).populate('category').exec();
    }
  }

  @Get('recommendations')
  getRecommendations() {
    return this.productsService.getRecommendations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id).populate('category').exec();
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
