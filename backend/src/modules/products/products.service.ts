import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CommonService } from 'src/shared/Common.service';
import { ProductDocument, ProductExecutor } from './schemas/product.schema';
import { getSlug } from 'src/shared/extra';

@Injectable()
export class ProductsService extends CommonService<ProductDocument, ProductExecutor> {
  constructor(executor: ProductExecutor) {
    super(executor);
  };

  async createProduct(dto: CreateProductDto) {
    const slug = getSlug(dto.name);
    const existProduct = await this.findOne({ slug });
    if (existProduct) throw new BadRequestException('Product with same slug already exist');
    return this.create({ ...dto, slug });
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    return this.update(id, dto);
  }

}
