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

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return this.model.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  findByIdAndUpdate(
    id: string,
    updateEntityData: UpdateQuery<T>,
  ) {
    if (!isValidObjectId(id)) return null;
    return this.model.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  findByIdAndRemove(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.model.findByIdAndRemove(id);
  }

  findOneAndDelete(entityFilterQuery: FilterQuery<T>) {
    return this.model.findByIdAndRemove(
      entityFilterQuery,
    );
  }

  deleteMany(entityFilterQuery: FilterQuery<T> = {}) {
    return this.model.deleteMany(entityFilterQuery);
  }
}