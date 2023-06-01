import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  User,
  UserDocument,
  UserExecutor,
  UserRole,
} from './schemas/user.schema';
import { CommonService } from 'src/shared/Common.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class UsersService extends CommonService<UserDocument, UserExecutor> {
  constructor(
    executor: UserExecutor,
    private productsService: ProductsService,
  ) {
    super(executor);
  }

  createUser(dto: CreateUserDto) {
    return this.create<Omit<User, 'id'>>({
      ...dto,
      basket: [],
      favorites: [],
      role: UserRole.USER,
    });
  }

  async getUser(id: string) {
    const user = await this.findOneById(id, 'favorites');
    const { password, ...res } = user.toJSON();
    return res;
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const userExist = await this.findOne({ email: dto.email });
    if (userExist) throw new BadRequestException('Email already used');
    if (dto.password) dto.password = await hash(dto.password);
    return await this.findByIdAndUpdate(id, dto);
  }

  async toggleFavorites(userId: string, productId: string) {
    const user = await this.findOneById(userId, 'favorites');
    if (!user) throw new NotFoundException('User not found');
    const product = await this.productsService.findOneById(productId);
    if (!product) throw new NotFoundException('Product not found');
    const isExist = user.favorites.some((item) => item.id === productId);
    return user
      .updateOne({
        [isExist ? '$pullAll' : '$push']: { favorites: [productId] },
      })
      .exec();
  }
}
