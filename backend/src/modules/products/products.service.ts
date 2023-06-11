import { CategoriesService } from './../categories/categories.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CommonService } from 'src/shared/Common.service';
import { ProductDocument, ProductExecutor } from './schemas/product.schema';
import { getSlug } from 'src/shared/extra';

const recommendationsCount = 5;

@Injectable()
export class ProductsService extends CommonService<
  ProductDocument,
  ProductExecutor
> {
  constructor(
    executor: ProductExecutor,
    private categoriesService: CategoriesService,
  ) {
    super(executor);
  }

  async createProduct(dto: CreateProductDto) {
    const slug = await this.getProductSlug(dto.name);
    let category = await this.categoriesService
      .findOne({ name: dto.category })
      .catch(() => console.log('New category'));
    if (!category) {
      category = await this.categoriesService.createCategory({
        name: dto.category,
      });
    }
    return this.create({ ...dto, slug, category: category.id });
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

  async getRecommendations() {
    const products = await this.findAll({}).populate('category').exec();
    const offset = Math.min(
      Math.round(Math.random() * products.length),
      products.length - recommendationsCount,
    );
    return products.slice(offset, offset + recommendationsCount);
  }
}
