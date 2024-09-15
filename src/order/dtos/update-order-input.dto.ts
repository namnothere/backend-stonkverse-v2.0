import { PartialType } from '@nestjs/swagger';

import { CreateOrderInput } from './create-order-input.dto';

export class UpdateOrderInput extends PartialType(CreateOrderInput) {}
