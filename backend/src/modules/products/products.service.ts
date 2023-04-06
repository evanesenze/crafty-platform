import { CategoriesService } from './../categories/categories.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CommonService } from 'src/shared/Common.service';
import { ProductDocument, ProductExecutor } from './schemas/product.schema';
import { getSlug } from 'src/shared/extra';

@Injectable()
export class ProductsService extends CommonService<ProductDocument, ProductExecutor> {
  constructor(executor: ProductExecutor, private categoriesService: CategoriesService) {
    super(executor);
  };

  async createProduct(dto: CreateProductDto) {
    const slug = await this.getProductSlug(dto.name);
    this.categoriesService.findOneById(dto.category)
    return this.create({ ...dto, slug });
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    if (dto.category) this.categoriesService.findOneById(dto.category);
    let body: object = { ...dto };
    if (dto.name) {
      const slug = await this.getProductSlug(dto.name);
      body = { ...body, slug };
    }
    return this.update(id, body);
  }

  private async getProductSlug(name: string) {
    const slug = getSlug(name);
    const existProduct = await this.findOne({ slug });
    if (existProduct) throw new BadRequestException('Product already exist');
    return slug;
  }


}
