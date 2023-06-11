import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { FilesModule } from './modules/files/Files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.BASE_URL),
    AuthModule,
    AppModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    OrdersModule,
    PaginationModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: 'upload',
    }),
  ],
})
export class AppModule {}
