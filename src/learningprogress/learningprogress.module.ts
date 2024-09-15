import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { LearningProgress } from './entities';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([LearningProgress])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class LearningprogressModule {}
