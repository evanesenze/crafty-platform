import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CommonService } from 'src/shared/Common.service';
import { Review, ReviewDocument, ReviewExecutor } from './schemas/review.schema';
import { ProductsService } from '../products/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService extends CommonService<ReviewDocument, ReviewExecutor> {
  constructor(executor: ReviewExecutor, private productService: ProductsService, @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {
    super(executor);
  };

  async createReview(userId: string, dto: CreateReviewDto) {
    const { product, rating, text } = dto;
    await this.productService.findOneById(product);
    return this.create({ rating, text, user: userId, product });
  }

  async updateReview(id: string, dto: UpdateReviewDto) {
    if (dto.product) await this.productService.findOneById(dto.product);
    return this.update(id, dto);
  }

  async getAverageValueByProductId(productiId: string) {
    // const res = await this.reviewModel.aggregate<Model<ReviewDocument>>([
    //   { $match: { product: productiId } },
    //   {
    //     $facet: {
    //       "numbers": [
    //         {
    //           "$group": {
    //             "_id": {
    //               "product": "$product",
    //               "rating": "$vote"
    //             },
    //             "count": {
    //               "$sum": 1.0
    //             }
    //           }
    //         },
    //         {
    //           "$group": {
    //             "_id": "$_id.product",
    //             "counts": {
    //               "$push": {
    //                 "rating": "$_id.rating",
    //                 "count": "$count"
    //               }
    //             },
    //             "totalItemCount": {
    //               "$sum": "$count"
    //             },
    //             "totalRating": {
    //               "$sum": "$_id.rating"
    //             }
    //           }
    //         }
    //       ],
    //       "reviews": [
    //         {
    //           "$skip": 0.0
    //         },
    //         {
    //           "$limit": 10.0
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     $unwind: "$numbers"
    //   },
    //   {
    //     $project: {
    //       "_id": "$numbers._id",
    //       "reviews": "$reviews",
    //       "avgRating": { "$divide": ["$numbers.totalRating", "$numbers.totalItemCount"] },
    //       "counts": "$numbers.counts"
    //     }
    //   }]).exec();
    // console.log(res);
    return 2.45;
  }

}
