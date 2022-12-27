import { Injectable } from '@nestjs/common';
import { Connection, FilterQuery, Model, QueryOptions } from 'mongoose';
import { User, UserDocument } from '@mussia30/node/nest/users-api';
import { handleError } from '@mussia30/node/nest/errors';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection // private logger: Logger
  ) {}

  findAll(
    query: FilterQuery<UserDocument>,
    projection: any,
    config: QueryOptions
  ) {
    return this.model.find(query, projection, config).lean().catch(handleError);
  }

  findById(id: string, projection: any) {
    return this.model.findById(id, projection);
  }

  create(createEntityData: Partial<User>): Promise<User> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
