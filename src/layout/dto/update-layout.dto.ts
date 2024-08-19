import { PartialType } from '@nestjs/swagger';

import { CreateLayoutDto } from './create-layout.dto';
import { IsString } from 'class-validator';

export class UpdateLayoutDto extends PartialType(CreateLayoutDto) {
    @IsString()
    id: string;

    constructor(partial: Partial<UpdateLayoutDto>) {
        super(partial);
        Object.assign(this, partial);
    }
}
