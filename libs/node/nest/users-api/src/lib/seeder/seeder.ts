import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';
import { UsersSeeder } from './users.seeder';
import { mongoConfig } from '@mussia30/node/nest/envs';

seeder({
  imports: [
    MongooseModule.forRoot(mongoConfig().MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
}).run([UsersSeeder]);
