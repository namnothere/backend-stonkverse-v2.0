import { PartialType } from '@nestjs/swagger';

import { CreateContactInput } from './create-contact-input.dto';

export class UpdateContactInput extends PartialType(CreateContactInput) {}
