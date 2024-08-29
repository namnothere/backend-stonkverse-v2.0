import { IsEmail, IsString } from "class-validator";

export class CreateContactInput {
    @IsEmail()
    email: string;

    @IsString()
    problem: string;

    @IsString()
    explain: string;

    constructor(partial: Partial<CreateContactInput>) {
        Object.assign(this, partial);
    }
}
