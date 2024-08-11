import { PartialType } from '@nestjs/swagger';
import { CreateLearningprogressDto } from './create-learningprogress.dto';

export class UpdateLearningprogressDto extends PartialType(CreateLearningprogressDto) {}
