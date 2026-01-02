import { Resend } from 'resend';

type SendEmailArgs = {
  to: string;
  subject: string;
  text: string;
  attachments?: Array<{ filename: string; content: Buffer | string; contentType?: string }>;
};

export async function sendEmail({ to, subject, text, attachments }: SendEmailArgs): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const from = process.env.LEADS_FROM_EMAIL || 'Flow State <no-reply@flow-state.ai>';
  const resend = new Resend(resendKey);

  await resend.emails.send({
    from,
    to,
    subject,
    text,
    ...(attachments?.length ? { attachments } : {}),
  });
}
