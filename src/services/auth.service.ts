import { userRepository } from '../repositories/user.repository';
import { IUser } from '../types/user.types';
import { signToken } from '../utils/jwt';
import { ApiError } from '../utils/apierror';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { env } from '../config/env';

export class AuthService {
  async register(userData: Partial<IUser>) {
    if (!userData.email || !userData.password || !userData.name) {
      throw new ApiError('Missing required fields', 400);
    }

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError('Email already registered', 400);
    }

    const newUser = await userRepository.create(userData);
    if (!newUser) {
      throw new ApiError('User creation failed', 500);
    }

    const token = signToken({ id: newUser._id, role: newUser.role });

    const { password, ...userResponse } = (newUser as any).toObject
      ? (newUser as any).toObject()
      : { ...newUser };

    return { user: userResponse, token };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new ApiError('Please provide email and password', 400);
    }

    const user = await userRepository.findByEmailWithPassword(email);

    if (!user || !(await (user as any).comparePassword(password))) {
      throw new ApiError('Incorrect email or password', 401);
    }

    const token = signToken({ id: user._id, role: user.role });

    const { password: _, ...userResponse } = (user as any).toObject
      ? (user as any).toObject()
      : { ...user };

    return { user: userResponse, token };
  }

  async forgotPassword(email: string) {
    if (!email) {
      throw new ApiError('Please provide an email address', 400);
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError('No user found with that email address', 404);
    }

    // 1. Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Set token and expiry (1 hour)
    await userRepository.update((user as any)._id.toString(), {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(Date.now() + 3600000),
    });

    // 3. Send email
    if (!env.EMAIL_USER || !env.EMAIL_PASS) {
      console.warn('⚠️ Email configuration missing. Skipping reset email.');
      return {
        message: 'Reset token generated (email skip)',
        token: resetToken,
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `EcoLearn India <${env.EMAIL_USER}>`,
      to: user.email,
      subject: 'EcoLearn India - Password Reset',
      text: `You requested a password reset. Please click on the following link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
      html: `<p>You requested a password reset. Please click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a><p>If you did not request this, please ignore this email.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending reset email:', error);
      throw new ApiError(
        'Error sending reset email. Please try again later.',
        500,
      );
    }

    return { message: 'Reset link sent to email' };
  }

  async resetPassword(token: string, password: string) {
    if (!token || !password) {
      throw new ApiError('Token and password are required', 400);
    }

    const user = await userRepository.findByResetToken(token);
    if (!user) {
      throw new ApiError('Token is invalid or has expired', 400);
    }

    // Update password and clear reset fields
    // We cast to any to access Mongoose document methods like .save()
    const userDoc = user as any;
    userDoc.password = password;
    userDoc.resetPasswordToken = undefined;
    userDoc.resetPasswordExpires = undefined;

    await userDoc.save();

    return { message: 'Password updated successfully' };
  }
}

export const authService = new AuthService();
