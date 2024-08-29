import { Expose } from "class-transformer";

export class ContactOutput {
    @Expose()
    email: string;

    @Expose()
    problem: string;

    @Expose()
    explain: string;

    constructor(partial: Partial<ContactOutput>) {
        Object.assign(this, partial);
    }
}
