import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

export abstract class CommonExecutor<T extends Document> {
  constructor(protected readonly model: Model<T>) { }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.model
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async findById(id: string): Promise<T | null> {
    return isValidObjectId(id) ? this.model.findById(id) : null;
  }

  async find(entityFilterQuery: FilterQuery<T> = {}): Promise<T[] | null> {
    return this.model.find(entityFilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.model(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
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
  ): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this.model.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  async findByIdAndRemove(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.model.findByIdAndRemove(id);
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>) {
    const deleteResult = await this.model.findByIdAndRemove(
      entityFilterQuery,
    );
    return deleteResult.$isDeleted;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T> = {}): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}