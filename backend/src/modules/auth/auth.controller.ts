import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login/refresh')
  @HttpCode(200)
  getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
