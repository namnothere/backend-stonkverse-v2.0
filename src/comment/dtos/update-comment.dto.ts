import { PartialType } from '@nestjs/swagger';

import { CreateCommentInput } from './create-comment-input.dto';

export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
