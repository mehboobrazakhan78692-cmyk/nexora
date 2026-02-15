import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateRandomToken = (length: number = 32): string => {
  return Math.random().toString(36).substring(2, 2 + length) +
    Math.random().toString(36).substring(2, 2 + length);
};

export const generateVerificationToken = (): string => {
  return generateRandomToken(64);
};

export const generateResetPasswordToken = (): string => {
  return generateRandomToken(64);
};
