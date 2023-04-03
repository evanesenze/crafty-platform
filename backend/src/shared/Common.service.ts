import { CommonExecutor } from './Common.executor';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export class CommonService<D extends Document, T extends CommonExecutor<D>> {
  constructor(private executor: T) { };

  protected create<DtoType>(dto: DtoType) {
    return this.executor.create(dto);
  }

  findAll() {
    return this.executor.find();
  }

  findOneById(id: string) {
    return this.executor.findById(id);
  }

  findOne(filter: FilterQuery<D>) {
    return this.executor.findOne(filter);
  }

  protected update<DtoType>(id: string, updateUserDto: DtoType) {
    return this.executor.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.executor.findByIdAndRemove(id);
  }

  findByIdAndUpdate(id: string, dto: UpdateQuery<D>) {
    return this.executor.findByIdAndUpdate(id, dto);
  }
}
