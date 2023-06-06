import { ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  ProjectionType,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

export interface IExecutorSearch {
  query?: string;
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
}

const getSearchPipeline = (query: string): PipelineStage => ({
  $search: {
    index: 'ProductsIndex',
    text: {
      query,
      path: {
        wildcard: '*',
      },
    },
  },
});

const getSortPipeline = (sort: Record<string, 1 | -1>): PipelineStage => ({
  $sort: sort,
});

const getLimitPipeline = (limit: number): PipelineStage => ({
  $limit: limit,
});

const getSkipPipeline = (skip: number): PipelineStage => ({
  $skip: skip,
});

export abstract class CommonExecutor<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async search(search: IExecutorSearch) {
    const { query, sort, limit, skip } = search;
    const stage: PipelineStage[] = [];
    if (query) stage.push(getSearchPipeline(query));
    if (sort) stage.push(getSortPipeline(sort));
    if (skip) stage.push(getSkipPipeline(skip));
    if (limit) stage.push(getLimitPipeline(limit));
    stage.push({
      $addFields: { id: '$_id' },
    });
    return this.model.aggregate<T>(stage).exec();
  }

  findOne(entityFilterQuery: FilterQuery<T>, projection?: ProjectionType<T>) {
    return this.model.findOne(entityFilterQuery, projection);
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
    return this.model.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    });
  }

  async findByIdAndUpdate(id: string, updateEntityData: UpdateQuery<T>) {
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
    return this.model.findByIdAndRemove(entityFilterQuery);
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
