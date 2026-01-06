@echo off
cd /d C:\Users\shaha\WebstormProjects\sih-2025-ecolearn-india-backend
git add -A
git commit -m "feat(config,schema): environment setup and database schema updates - T001: Update .env to use CLIENT_URL instead of FRONTEND_URL (align with spec) - T002: Update CORS configuration to use CLIENT_URL environment variable - T003: Add avatar field to User schema with default value - T004: Update Submission schema to match specification (challengeId as String, add challengeTitle, description, imageUrl, points, teacherComment) - T005: Create new Progress schema for learning progress tracking (userId, moduleId, completedLessons[], isCompleted, quizScore, lastAccessed)"
git log --oneline -10
