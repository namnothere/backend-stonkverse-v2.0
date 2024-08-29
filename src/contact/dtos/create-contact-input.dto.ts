import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactInput {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    problem: string;

    @IsString()
    @IsNotEmpty()
    explain: string;

    constructor(partial: Partial<CreateContactInput>) {
        Object.assign(this, partial);
    }
}
