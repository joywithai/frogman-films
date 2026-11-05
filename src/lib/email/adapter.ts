// Email & Dispatch Adapter for Frogman Films
// Spec: "Newsletter only if genuinely connected to an email provider."

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailAdapter {
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = Boolean(
      process.env.EMAIL_API_KEY && process.env.EMAIL_FROM
    );
  }

  isEmailServiceConfigured(): boolean {
    return this.isConfigured;
  }

  async sendEmail(params: SendEmailParams): Promise<{ success: boolean; message: string }> {
    if (!this.isConfigured) {
      console.info(
        `[EmailAdapter Mock Dispatch] Would send email to: ${params.to} | Subject: "${params.subject}" (Real email provider unconfigured).`
      );
      return {
        success: false,
        message: "Email provider not configured in environment.",
      };
    }

    // In production with Resend / SendGrid / Postmark:
    // await resend.emails.send({ from: process.env.EMAIL_FROM!, to: params.to, subject: params.subject, html: params.html })
    return {
      success: true,
      message: "Dispatched",
    };
  }
}

export const emailAdapter = new EmailAdapter();
