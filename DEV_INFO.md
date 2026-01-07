# EcoLearn India - Developer & Testing Information

This document contains credentials and information for the frontend and QA teams to test the API.

## 👥 Seeded Test Accounts
Use these accounts to test different roles and permissions. All passwords are `password123`.

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@ecolearn.com` | `password123` | Create modules, approve challenges |
| **Teacher** | `teacher@ecolearn.com` | `password123` | View modules, student progress |
| **Student** | `student@ecolearn.com` | `password123` | Take quizzes, submit challenges |

## 🔗 Important URLs
- **Production API URL**: `https://sih-2025-ecolearn-india-backend-production.up.railway.app/api`
- **Production API Docs**: `https://sih-2025-ecolearn-india-backend-production.up.railway.app/api-docs`
- **Local API Base URL**: `http://localhost:5000/api`
- **Local API Docs**: `http://localhost:5000/api-docs`
- **Health Check**: `https://sih-2025-ecolearn-india-backend-production.up.railway.app/api/health`

## 🛠 Useful Commands
- **Seed Database**: `npm run seed` (Wipes everything and creates the accounts above)
- **Start Backend**: `npm run dev` or `docker-compose up`

## 🖼 Image Uploads
Image uploads (Profiles, Challenge Proofs) require Cloudinary configuration. If uploads fail with a 500 error, check that `CLOUDINARY_*` keys are set in the `.env` file.
