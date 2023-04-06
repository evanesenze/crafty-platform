import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewExecutor, ReviewSchema } from './schemas/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewExecutor, ReviewsService],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    ProductsModule
  ],
})
export class ReviewsModule { }
