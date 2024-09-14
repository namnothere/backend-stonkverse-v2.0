import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateOrderInput {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsObject()
  @IsNotEmpty()
  payment_info: Record<string, any>;

  constructor(partial: Partial<CreateOrderInput>) {
    Object.assign(this, partial);
  }
}
