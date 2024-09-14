import { PartialType } from '@nestjs/swagger';

import { CreateNotificationInput } from './create-notification-input.dto';

export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {}
