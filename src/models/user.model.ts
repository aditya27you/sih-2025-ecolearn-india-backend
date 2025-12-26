import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user.types';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School',
    },
    grade: {
      type: Number,
      min: 6,
      max: 12,
    },
    ecoPoints: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ schoolId: 1, ecoPoints: -1 });

UserSchema.pre('save', async function () {
  const user = this as any;
  if (!user.isModified('password')) return;
  
  user.password = await bcrypt.hash(user.password, 12);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, (this as any).password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
