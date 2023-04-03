import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserExecutor } from './schemas/user.schema';
import { CommonService } from 'src/shared/Common.service';

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
}