import { Module } from '@nestjs/common';

import { LearningprogressController } from './learningprogress.controller';
import { LearningprogressService } from './learningprogress.service';

@Module({
  controllers: [LearningprogressController],
  providers: [LearningprogressService],
})
export class LearningprogressModule {}
