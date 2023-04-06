import { CommonExecutor } from './Common.executor';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export class CommonService<D extends Document, T extends CommonExecutor<D>> {
  constructor(protected readonly executor: T) { };

  protected create<DtoType>(dto: DtoType) {
    return this.executor.create(dto);
  }

  findAll(populatedPath: string | string[] = '') {
    return this.executor.find().populate(populatedPath).exec();
  }

  findOneById(id: string, populatedPath: string | string[] = '') {
    return this.executor.findById(id).populate(populatedPath).exec();
  }

  findOne(filter: FilterQuery<D>, populatedPath: string | string[] = '') {
    return this.executor.findOne(filter).populate(populatedPath).exec();
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
