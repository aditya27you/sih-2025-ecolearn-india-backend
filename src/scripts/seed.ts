import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model';
import { Module } from '../models/module.model';
import { Lesson } from '../models/lesson.model';
import { Challenge } from '../models/challenge.model';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecolearn';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Challenge.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecolearn.com',
      password: 'password123',
      role: 'admin',
      ecoPoints: 100,
    });

    const teacher = await User.create({
      name: 'Teacher User',
      email: 'teacher@ecolearn.com',
      password: 'password123',
      role: 'teacher',
      ecoPoints: 50,
    });

    const student = await User.create({
      name: 'Student User',
      email: 'student@ecolearn.com',
      password: 'password123',
      role: 'student',
      grade: 10,
      ecoPoints: 0,
    });

    console.log('👥 Users created');

    // Create Module
    const module1 = await Module.create({
      title: 'Climate Change Basics',
      description: 'Introduction to Climate Change',
      difficulty: 'Beginner',
      ecoPoints: 50,
      createdBy: admin._id,
    });

    // Create Lesson
    await Lesson.create({
      title: 'What is Global Warming?',
      content:
        "Global warming is the long-term heating of Earth's climate system.",
      moduleId: module1._id,
      order: 1,
    });

    console.log('📚 Modules and Lessons created');

    // Create Challenge
    await Challenge.create({
      title: 'Plant a Tree',
      description: 'Plant a tree in your neighborhood and upload a photo.',
      ecoPoints: 100,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdBy: admin._id,
    });

    console.log('🌱 Challenges created');

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
