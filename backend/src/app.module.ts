import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot('mongodb+srv://evanesenze:ZXCpoi12@base.6n0ujy2.mongodb.net/?retryWrites=true&w=majority'), AuthModule, AppModule, UsersModule],
})
export class AppModule { }
