import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserExecutor, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [UsersController],
  providers: [UserExecutor, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProductsModule
  ],
  exports: [UsersService]
})
export class UsersModule { }
