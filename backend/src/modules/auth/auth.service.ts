import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

const userId = '6478b721367004cb23e5756d';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync<{ id: string; email: string }>(
      refreshToken,
    );
    if (!result) throw new UnauthorizedException('Invalid refresh token');
    const user = await this.usersService.findOneById(result.id);
    const tokens = await this.issueTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register({ email, password }: AuthDto) {
    const existUser = await this.usersService.findOne({ email });
    if (existUser) throw new BadRequestException('User already exist');
    const user = await this.usersService.createUser({
      email,
      name: faker.name.fullName(),
      password: await hash(password),
      avatar: faker.image.avatar(),
      phone: faker.phone.number('+7 (###) ###-##-##'),
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    console.log(user);
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser({ email, password }: AuthDto) {
    const user = (await this.usersService.findOneById(userId)).toJSON();
    console.log('user', user);
    if (!user) throw new NotFoundException('User not found');
    const isValid = await verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Invalid password');
    return user;
  }
}
