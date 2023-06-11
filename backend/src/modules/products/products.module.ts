import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {
  Product,
  ProductExecutor,
  ProductSchema,
} from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from '../files/GridFsMulterConfig.service';

@Module({
  controllers: [ProductsController],
  providers: [GridFsMulterConfigService, ProductExecutor, ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoriesModule,
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  exports: [ProductsService, ProductExecutor],
})
export class ProductsModule {}
