import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decortators/auth.decorator';
import { CurrentUser } from '../auth/decortators/user.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.findOneById(userId, 'favorites');
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Put('profile')
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UserDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Auth()
  @Post('profile/favorites/:productId')
  toggleFavorites(@Param('productId') productId: string, @CurrentUser('id') userId: string) {
    return this.usersService.toggleFavorites(userId, productId);
  }
}
