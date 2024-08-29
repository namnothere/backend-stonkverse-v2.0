import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningProgress } from './entities';
import { LearningprogressController } from './learningprogress.controller';
import { LearningprogressService } from './learningprogress.service';

@Module({
  imports: [TypeOrmModule.forFeature([LearningProgress])],
  controllers: [LearningprogressController],
  providers: [LearningprogressService],
})
export class LearningprogressModule {}
