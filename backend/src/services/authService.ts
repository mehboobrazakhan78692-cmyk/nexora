import { prisma } from '../index';
import { AppError } from '../middleware/error';
import { hashPassword, comparePassword, generateVerificationToken, generateResetPasswordToken } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendVerificationEmail, sendResetPasswordEmail, sendWelcomeEmail } from './emailService';

export const registerUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const hashedPassword = await hashPassword(data.password);
  const verificationToken = generateVerificationToken();

  // Auto-verify for development
  const isDevelopment = process.env.NODE_ENV === 'development';

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      emailVerifyToken: isDevelopment ? null : verificationToken,
      isEmailVerified: isDevelopment,
      status: isDevelopment ? 'ACTIVE' : 'PENDING'
    }
  });

  if (!isDevelopment) {
    try {
      await sendVerificationEmail(data.email, `${data.firstName} ${data.lastName}`, verificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
    }
  }

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  // Allow login without email verification in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (user.status === 'PENDING' && !isDevelopment) {
    throw new AppError('Please verify your email first', 403);
  }
  
  // Auto-activate pending users in development
  if (user.status === 'PENDING' && isDevelopment) {
    await prisma.user.update({
      where: { id: user.id },
      data: { status: 'ACTIVE', isEmailVerified: true }
    });
  }

  if (user.status === 'SUSPENDED') {
    throw new AppError('Your account has been suspended', 403);
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email
  });

  await prisma.session.create({
    data: {
      userId: user.id,
      token: accessToken,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ipAddress: 'unknown',
      userAgent: 'unknown'
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLogin: new Date(),
      refreshToken: refreshToken
    }
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status
    }
  };
};

export const verifyEmail = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: { emailVerifyToken: token }
  });

  if (!user) {
    throw new AppError('Invalid verification token', 400);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      status: 'ACTIVE',
      emailVerifyToken: null
    }
  });

  try {
    await sendWelcomeEmail(user.email, `${user.firstName} ${user.lastName}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }

  return { message: 'Email verified successfully' };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return { message: 'If the email exists, a reset link will be sent' };
  }

  const resetToken = generateResetPasswordToken();
  const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires
    }
  });

  try {
    await sendResetPasswordEmail(user.email, `${user.firstName} ${user.lastName}`, resetToken);
  } catch (error) {
    console.error('Failed to send reset password email:', error);
  }

  return { message: 'If the email exists, a reset link will be sent' };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        gt: new Date()
      }
    }
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token', 400);
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  await prisma.session.deleteMany({
    where: { userId: user.id }
  });

  return { message: 'Password reset successfully' };
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logoutUser = async (userId: string) => {
  await prisma.session.deleteMany({
    where: { userId }
  });

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null }
  });

  return { message: 'Logged out successfully' };
};
