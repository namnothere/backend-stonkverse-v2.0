import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { PromotionCode } from './entities';
import * as providers from './providers';
import { Course } from '../course/entities';
import { User } from '../user/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromotionCode,
      Course,
      User
    ]),
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class PromotionCodeModule {}
