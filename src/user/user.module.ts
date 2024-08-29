import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { Avatar, User } from './entities';
import * as providers from './providers';
import { CloudinaryModule } from '../cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([User, Avatar]), CloudinaryModule],
  exports: Object.values(providers),
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class UserModule {}
