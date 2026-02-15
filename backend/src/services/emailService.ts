import nodemailer from 'nodemailer';
import { AppError } from '../middleware/error';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'NEXORA <noreply@nexora.com>',
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new AppError('Failed to send email', 500);
  }
};

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
): Promise<void> => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0ea5e9;">Welcome to NEXORA!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for registering with NEXORA. Please verify your email address by clicking the button below:</p>
      <a href="${verificationUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verify Email</a>
      <p>Or copy and paste this link: ${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, please ignore this email.</p>
      <p>Best regards,<br>The NEXORA Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify your NEXORA account',
    html
  });
};

export const sendResetPasswordEmail = async (
  email: string,
  name: string,
  token: string
): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0ea5e9;">Reset Your Password</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
      <p>Or copy and paste this link: ${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      <p>Best regards,<br>The NEXORA Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Reset your NEXORA password',
    html
  });
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0ea5e9;">Welcome to NEXORA!</h1>
      <p>Hi ${name},</p>
      <p>Welcome to NEXORA! We're excited to have you on board.</p>
      <p>With NEXORA, you can:</p>
      <ul>
        <li>Manage your account</li>
        <li>Access advanced features</li>
        <li>Connect with our community</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The NEXORA Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Welcome to NEXORA!',
    html
  });
};
