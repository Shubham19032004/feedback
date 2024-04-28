import { Resend } from "resend";

export const resend = new Resend(process.env.Mail_URL);
