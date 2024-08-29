import { PartialType } from '@nestjs/swagger';
import { CreateLayoutInput } from './create-layout-input.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { LAYOUT_TYPE } from '../entities';

export class UpdateLayoutInput extends PartialType(CreateLayoutInput) {
    @IsNotEmpty()
    @IsString()
    type: LAYOUT_TYPE;
    
    constructor(partial: Partial<UpdateLayoutInput>) {
        super(partial);
        Object.assign(this, partial);
    }
}
