import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Auth } from '../auth/decortators/auth.decorator';
import { CurrentUser } from '../auth/decortators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(@CurrentUser('id') userId, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(userId, createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll(['user', 'product']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOneById(id, ['user', 'product']);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
