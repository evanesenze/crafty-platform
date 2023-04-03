import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserExecutor } from './schemas/user.schema';
import { CommonService } from 'src/shared/Common.service';
import { UserDto } from './dto/user.dto';
import { hash } from 'argon2';

@Injectable()
export class UsersService extends CommonService<UserDocument, UserExecutor> {

  constructor(executor: UserExecutor) {
    super(executor);
  };

  createUser(dto: CreateUserDto) {
    return this.create(dto);
  }

  updateUser(id: string, dto: UpdateUserDto) {
    return this.update(id, dto);
  }

  async updateProfile(id: string, dto: UserDto) {
    const userExist = await this.findOne({ email: dto.email });
    if (userExist) throw new BadRequestException('Email already used');
    if (dto.password) dto.password = await hash(dto.password);
    return await this.findByIdAndUpdate(id, dto);
  }

  async toggleFavorites(userId: string, productId: string) {
    const user = await this.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    const isExist = user.favorites.some(item => item.id === productId);
    await this.findByIdAndUpdate(userId, { [isExist ? '$unset' : '$set']: { favorites: [productId] } });
  }
}