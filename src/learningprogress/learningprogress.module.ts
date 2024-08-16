import { Module } from '@nestjs/common';

import { LearningprogressController } from './learningprogress.controller';
import { LearningprogressService } from './learningprogress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningProgress } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearningProgress
    ]),
  ],
  controllers: [LearningprogressController],
  providers: [LearningprogressService],
})
export class LearningprogressModule {}
