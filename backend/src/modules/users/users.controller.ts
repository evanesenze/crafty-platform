import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decortators/auth.decorator';
import { CurrentUser } from '../auth/decortators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getUser(userId);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch('profile')
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Auth()
  @Post('profile/favorites/:productId')
  toggleFavorites(@Param('productId') productId: string, @CurrentUser('id') userId: string) {
    return this.usersService.toggleFavorites(userId, productId);
  }
}
