import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'FeedBack Verifiaction code',
        react: VerificationEmail({username,otp:verifyCode})
      });
    return { success: true, message: "Verification email send successfully" };
    verifyCode
  } catch (error) {
    console.error("Error sending verifiaction emial", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
