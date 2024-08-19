import { IsEmail, IsString } from "class-validator";

export class CreateContactDto {
    @IsEmail()
    email: string;

    @IsString()
    problem: string;

    @IsString()
    explain: string;

    constructor(partial: Partial<CreateContactDto>) {
        Object.assign(this, partial);
    }
}
