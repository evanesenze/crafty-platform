import { NotFoundException } from '@nestjs/common';
import { CommonExecutor } from './Common.executor';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export type CreateParam<T> = Omit<T, 'id'>;
export type UpdateParam<T> = Partial<CreateParam<T>>;

export class CommonService<D extends Document, T extends CommonExecutor<D>> {
  constructor(protected readonly executor: T) { };

  protected create<DtoType>(dto: CreateParam<DtoType>) {
    return this.executor.create(dto);
  }

  search(query: string) {
    return this.executor.search({ query });
  }

  findAll(populatedPath: string | string[] = '') {
    const item = this.executor.find();
    if (!item) throw new NotFoundException();
    return item.populate(populatedPath).exec();
  }

  findOneById(id: string, populatedPath: string | string[] = '') {
    const item = this.executor.findById(id);
    if (!item) throw new NotFoundException();
    return item.populate(populatedPath).exec();
  }

  findOne(filter: FilterQuery<D>, populatedPath: string | string[] = '') {
    const item = this.executor.findOne(filter);
    if (!item) throw new NotFoundException();
    return item.populate(populatedPath).exec();
  }

  protected update<DtoType>(id: string, dto: UpdateParam<DtoType>) {
    return this.executor.findByIdAndUpdate(id, dto);
  }

  remove(id: string) {
    return this.executor.findByIdAndRemove(id);
  }

  findByIdAndUpdate(id: string, dto: UpdateQuery<D>) {
    return this.executor.findByIdAndUpdate(id, dto);
  }
}
