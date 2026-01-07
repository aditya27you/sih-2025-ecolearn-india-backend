
# EcoLearn India – Backend REST API

**Smart India Hackathon (SIH) 2025**
**Problem Statement ID:** 25009

[![Node.js](https://img.shields.io/badge/Node.js-22_LTS-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/import?repo=https://github.com/aditya27you/sih-2025-ecolearn-india-backend)

---

## 📘 Overview

The **EcoLearn India Backend** is a **scalable, secure, and RESTful API** built using **Express.js and TypeScript**, designed to power a **gamified environmental education platform**.

The backend manages authentication, learning modules, quizzes, real-world eco-challenges, gamification logic, and multi-level leaderboards for students, teachers, and administrators across India.

This project is **hackathon-ready, production-aligned**, and follows **industry-standard backend architecture**.

---

## 🎯 Key Objectives

* Promote **environmental awareness** through digital learning
* Enable **real-world eco actions** via challenges
* Provide **fair & transparent leaderboards**
* Ensure **secure role-based access**
* Support **future scale** (mobile apps, AI verification, analytics)

---

## 🧠 Core Features

* 🔐 **Authentication & Authorization**

    * JWT-based authentication
    * Role-based access (Student / Teacher / Admin)

* 📘 **Learning Modules**

    * Modules & lessons CRUD
    * Difficulty-based filtering
    * Pagination & search

* 🧠 **Quizzes**

    * Module-linked quizzes
    * Auto-evaluation & scoring

* 🌱 **Eco-Challenges**

    * Real-world challenges
    * Image-based submissions
    * Teacher/Admin approval workflow

* 🏆 **Gamification**

    * Eco-points
    * Badges & streaks
    * Multi-level leaderboards (School / State / National)

* 📊 **Leaderboards**

    * Optimized & indexed ranking queries

* ⚠️ **Robust Error Handling**

    * Centralized error handler
    * Validation at API & DB level

---

## 🛠️ Technology Stack

| Layer       | Technology        |
| ----------- | ----------------- |
| Runtime     | Node.js (LTS)     |
| Language    | TypeScript        |
| Framework   | Express.js        |
| Database    | MongoDB (Atlas)   |
| ODM         | Mongoose          |
| Auth        | JWT + bcrypt      |
| Validation  | Zod               |
| File Upload | Multer            |
| Security    | Helmet, CORS      |
| Logging     | Morgan            |
| Testing     | Jest, Supertest   |
| API Testing | Postman           |

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v22+ recommended)
* MongoDB (Local or Atlas)
* npm / yarn

---

### Installation

```bash
git clone <repository-url>
cd ecolearn-backend
npm install
```

---

### Environment Variables

Create `.env` in root:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://localhost:27017/ecolearn

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
```

---

### Run Development Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

### Production Build

```bash
npm run build
npm start
```

---

## 📡 API Base URL

```
/api
```

---

## 📦 API Response Format

### Success Response

Success responses return the requested data directly (e.g., objects or arrays).

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Field is required"]
}
```

---

## 🔗 Core API Endpoints

### 📘 Modules

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | `/modules`     | List modules          |
| GET    | `/modules/:id` | Module details        |
| POST   | `/modules`     | Create module (Admin) |
| PUT    | `/modules/:id` | Update module         |
| DELETE | `/modules/:id` | Delete module         |

---

### 📚 Lessons

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/modules/:id/lessons` |
| POST   | `/modules/:id/lessons` |
| PUT    | `/lessons/:id`         |
| DELETE | `/lessons/:id`         |

---

### 🧠 Quizzes

| Method | Endpoint                    | Description |
| ------ | --------------------------- | ----------- |
| GET    | `/quizzes/:moduleId`        | Get quiz    |
| POST   | `/quizzes/:moduleId/submit` | Submit quiz |
| PUT    | `/quizzes/:id`              | Update quiz |
| DELETE | `/quizzes/:id`              | Delete quiz |

---

### 🌱 Challenges

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| GET    | `/challenges`              | List challenges    |
| GET    | `/challenges/:id`          | Challenge details  |
| POST   | `/challenges`              | Create challenge   |
| POST   | `/challenges/submit`       | Submit challenge   |
| PUT    | `/submissions/:id/approve` | Approve submission |

---

### 🏆 Leaderboard

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/leaderboard`              | Global/Filtered      |
| GET    | `/leaderboard/school/:id`   | School leaderboard   |
| GET    | `/leaderboard/state/:state` | State leaderboard    |
| GET    | `/leaderboard/national`     | National leaderboard |

---

## 🗂️ Project Structure

```bash
src/
├── app.ts
├── server.ts
├── config/
├── constants/
├── models/
├── repositories/
├── services/
├── controllers/
├── routes/
├── middlewares/
├── validators/
├── utils/
├── uploads/
└── types/
```

✔ Layered architecture
✔ Clean separation of concerns
✔ Easy scalability

---

## 🧪 Testing

### Manual Testing

* Postman collection with all endpoints
* Auth, challenges, leaderboard flows tested

### Automated Testing

* Unit tests (services)
* Integration tests (routes)

```bash
npm test
```

---

## 🐳 Deployment (Recommended)

### 🚂 One-Click Deploy
Click the button below to automatically clone this repo, set up a MongoDB instance, and deploy the API to Railway:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/import?repo=https://github.com/aditya27you/sih-2025-ecolearn-india-backend)

### 🐋 Docker & Docker Compose
The easiest way to run the entire stack (API + MongoDB) locally:

1. **Start the stack**:
   ```bash
   docker-compose up -d --build
   ```
2. **Seed the database**:
   ```bash
   docker exec ecolearn-backend npm run seed
   ```

The API will be available at `http://localhost:5000`.

---

## 🤝 Contributing

1. Fork repository
2. Create branch: `feature/your-feature`
3. Commit with conventional commits
4. Open Pull Request

---

## 📜 License

MIT License
See `LICENSE` file for details.

---

## 🙏 Acknowledgments

* **Smart India Hackathon 2025**
* Government of India
* Open-source community
* Educators & students inspiring sustainability

---

## 📌 Project Status

**Version:** 1.0.0
**Status:** Hackathon-Ready MVP
**Last Updated:** December 2024

