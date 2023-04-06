import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductExecutor, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductExecutor, ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoriesModule
  ],
  exports: [ProductsService, ProductExecutor]
})
export class ProductsModule { }
