import { Address } from "nodemailer/lib/mailer"

export type SendMailDto ={
    from?: Address;
    recipients: Address[];
    email?: string;
    subject: string;
    template: string;
    text?: string;
    data?: Record<string, string>;
}