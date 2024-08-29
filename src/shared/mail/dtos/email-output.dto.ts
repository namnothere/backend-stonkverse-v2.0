import { Expose } from "class-transformer";

export class EmailOutput {
    @Expose()
    id: string;

    @Expose()
    from: string;

    @Expose()
    to: string;

    @Expose()
    context: string;
    
    @Expose()
    subject: string;
    
    @Expose()
    template: string;
    
    @Expose()
    status: string;

    constructor(partial: Partial<EmailOutput>) {
        Object.assign(this, partial);
    }
}
