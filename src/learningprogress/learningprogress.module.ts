import { Module } from '@nestjs/common';
import { LearningprogressService } from './learningprogress.service';
import { LearningprogressController } from './learningprogress.controller';

@Module({
  controllers: [LearningprogressController],
  providers: [LearningprogressService],
})
export class LearningprogressModule {}
