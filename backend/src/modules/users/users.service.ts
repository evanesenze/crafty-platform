import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
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
import { OrderItemsService } from '../orders/services/orderItems.service';

@Injectable()
export class UsersService extends CommonService<UserDocument, UserExecutor> {
  constructor(
    executor: UserExecutor,
    private productsService: ProductsService,
    @Inject(forwardRef(() => OrderItemsService))
    private orderItemsService: OrderItemsService,
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
    const user = await this.findOneById(id)
      .populate({ path: 'favorites', populate: 'category' })
      .populate({ path: 'basket', populate: 'product' })
      .exec();
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
    const user = await this.findOneById(userId);
    await this.productsService.findOneById(productId);
    const isExist = user.favorites.includes(productId as any);

    return user
      .updateOne({
        [isExist ? '$pullAll' : '$push']: { favorites: [productId] },
      })
      .exec();
  }

  async addToBasket(userId: string, productId: string) {
    const user = await this.findOneById(userId);
    const product = await this.productsService.findOneById(productId);
    const orderItem = await this.orderItemsService.createItem({
      quantity: 1,
      price: product.price,
      product: product as any,
    });
    console.log('orderItem', orderItem);
    await user.updateOne({ $push: { basket: [orderItem] } }).exec();
    return true;
  }

  async deleteFromBasket(userId: string, itemId: string) {
    const user = await this.findOneById(userId);
    await user.updateOne({ $pullAll: { basket: [itemId] } }).exec();
    const orderItem = await this.orderItemsService.findOneById(itemId);
    !orderItem.order && (await this.orderItemsService.remove(itemId));
    return true;
  }
}
