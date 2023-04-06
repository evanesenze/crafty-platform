import { ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

export abstract class CommonExecutor<T extends Document> {
  constructor(protected readonly model: Model<T>) { }

  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ) {
    return this.model
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      });
  }

  findById(id: string, projection?: ProjectionType<T>) {
    return isValidObjectId(id) ? this.model.findById(id, projection) : null;
  }

  find(entityFilterQuery: FilterQuery<T> = {}, projection?: ProjectionType<T>) {
    return this.model.find(entityFilterQuery, projection);
  }

  create(createEntityData: unknown) {
    const entity = new this.model(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    await this.checkExisting(entityFilterQuery);
    return this.model.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async findByIdAndUpdate(
    id: string,
    updateEntityData: UpdateQuery<T>,
  ) {
    if (!isValidObjectId(id)) throw new ForbiddenException('Wrong id');
    await this.checkExisting({ _id: id });
    return this.model.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  async findByIdAndRemove(id: string) {
    if (!isValidObjectId(id)) throw new ForbiddenException('Wrong id');
    await this.checkExisting({ _id: id });
    return this.model.findByIdAndRemove(id);
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>) {
    await this.checkExisting(entityFilterQuery);
    return this.model.findByIdAndRemove(
      entityFilterQuery,
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T> = {}) {
    await this.checkExisting(entityFilterQuery);
    return this.model.deleteMany(entityFilterQuery);
  }

  private async checkExisting(filter: FilterQuery<T>) {
    const isExist = await this.model.exists(filter).exec();
    if (!isExist) throw new NotFoundException();
  }
}