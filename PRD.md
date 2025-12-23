Below is the **expected output** for **PROMPT 1**, written as a **professional Backend Product Requirements Document (PRD)** in **Markdown**, scoped **only** to:

✅ Document Header
✅ Backend Overview
✅ Technology Stack

This is **clean, evaluable, and SIH-ready**. You can save this as `BACKEND_PRD.md`.

---

# EcoLearn India – Backend Product Requirements Document (PRD)

**Project Name:** EcoLearn India – Backend REST API
**Project Type:** Express.js + TypeScript REST API
**API Version:** v1.0.0
**Document Version:** 1.0
**Last Updated:** December 2024
**Prepared For:** Smart India Hackathon (SIH) 2025
**Problem Statement ID:** 25009

**Development Team:**

* Backend Engineers (Node.js + TypeScript)
* Frontend Engineers (React + TypeScript)
* Product & UX Team

---

## 1. Backend Overview

### 1.1 Purpose

The **EcoLearn India Backend** is a secure, scalable, and modular REST API that powers the EcoLearn India gamified environmental education platform. It acts as the core system responsible for user authentication, learning content management, real-world eco-challenge workflows, gamification logic, analytics, and leaderboard computation.

The backend ensures reliable communication between the frontend application and the database while enforcing business rules, security standards, and performance constraints.

---

### 1.2 Problem Statement (Backend Perspective)

Environmental education platforms require:

* Secure multi-role access (students, teachers, admins)
* Scalable content delivery (modules, quizzes, challenges)
* Real-world action verification (image uploads & approvals)
* Transparent and fair leaderboard computation
* Clean API contracts for frontend integration

Traditional monolithic or poorly structured APIs fail to scale, become hard to maintain, and introduce security risks.

---

### 1.3 Solution Overview

The EcoLearn India backend is designed as a **RESTful API** following:

* **Richardson Maturity Model – Level 2**
* **Layered Architecture**
* **Strict separation of concerns**
* **Semantic versioning**
* **Centralized error handling**

This approach ensures maintainability, scalability, and ease of future extension (mobile apps, analytics engines, admin tools).

---

### 1.4 Frontend Integration

**Frontend Exists:** ✅ Yes

**Frontend Description:**
A modern **React 19 + TypeScript** web application built using **Vite**, **TailwindCSS**, and **DaisyUI**. The frontend consumes backend APIs for authentication, learning modules, quizzes, challenges, dashboards, leaderboards, and profile management.

The backend exposes JSON-based REST endpoints optimized for frontend performance and usability.

---

### 1.5 Core Backend Responsibilities

* User authentication & authorization (JWT-based)
* Role-based access control (Student / Teacher / Admin)
* CRUD operations for learning modules and quizzes
* Eco-challenge submission & approval workflow
* Gamification logic (eco-points, badges, streaks)
* Leaderboard computation (school, state, national)
* File upload handling (challenge proof images)
* Validation, logging, and error handling

---

### 1.6 Resources Managed by the Backend

| Resource      | Description                            |
| ------------- | -------------------------------------- |
| Users         | Students, teachers, and administrators |
| Schools       | Registered schools and metadata        |
| Modules       | Learning modules and lessons           |
| Quizzes       | Assessments linked to modules          |
| Challenges    | Real-world eco challenges              |
| Submissions   | Student challenge submissions          |
| Badges        | Achievement definitions                |
| Leaderboards  | Ranking and competition data           |
| Notifications | User alerts and updates                |

---

## 2. API Design Principles

### 2.1 REST API Best Practices

* Resource-oriented URLs
* Stateless requests
* JSON request/response format
* Proper use of HTTP verbs and status codes
* Clear and predictable endpoint naming

**Example:**

```http
GET    /api/v1/modules
POST   /api/v1/challenges/{id}/submit
PUT    /api/v1/submissions/{id}/approve
```

---

### 2.2 Richardson Maturity Model – Level 2

| Level                               | Support          |
| ----------------------------------- | ---------------- |
| Level 0 – Single endpoint           | ❌                |
| Level 1 – Resource URIs             | ✅                |
| Level 2 – HTTP Verbs & Status Codes | ✅                |
| Level 3 – HATEOAS                   | ❌ (Future scope) |

---

### 2.3 API Versioning Strategy

* **Semantic Versioning:** `vMAJOR.MINOR.PATCH`
* Version included in API path

```http
/api/v1/auth/login
/api/v1/modules
```

---

## 3. Technology Stack

### 3.1 Runtime & Language

| Layer    | Technology      |
| -------- | --------------- |
| Runtime  | Node.js v22 LTS |
| Language | TypeScript 5.x  |

---

### 3.2 Backend Frameworks & Libraries

| Category           | Technology                  |
| ------------------ | --------------------------- |
| Web Framework      | Express.js v5               |
| Database           | MongoDB                     |
| ODM                | Mongoose v9                 |
| Authentication     | JWT + bcrypt                |
| Validation         | Zod                         |
| File Upload        | Multer                      |
| Security           | Helmet, CORS                |
| Environment Config | dotenv                      |
| Logging            | Morgan (dev), custom logger |

---

### 3.3 Development & Tooling

| Purpose             | Tool                     |
| ------------------- | ------------------------ |
| Code Quality        | ESLint, Prettier         |
| Dev Server          | ts-node-dev / nodemon    |
| API Testing         | Postman / Thunder Client |
| Version Control     | Git & GitHub             |
| Deployment (Future) | Docker, Cloud VM         |

---

## 4. Architectural Standards (Summary)

* **Layered Architecture**

  ```
  Routes → Controllers → Services → Models
  ```
* **Single Responsibility Principle**
* **Centralized error handling**
* **Reusable middleware**
* **Environment-based configuration**

---

Below is **PROMPT 2** content, written as a **student-friendly yet professional Backend PRD section**, formatted fully in **Markdown**.

You can **append this directly** to your existing `BACKEND_PRD.md`.

---

# 5. REST Principles & API Architecture

This section explains **why and how** the EcoLearn India backend follows REST standards and a clean backend architecture.
The explanations are intentionally **simple and beginner-friendly**, suitable for students learning backend development.

---

## 5.1 REST Principles (The 6 REST Constraints)

REST (Representational State Transfer) is an architectural style for building scalable APIs.
A RESTful API follows **six core constraints**:

---

### 1️⃣ Client–Server Separation

**What it means:**

* Frontend (client) and backend (server) are independent.
* The frontend only consumes APIs; it doesn’t know database logic.

**Why it matters:**

* Frontend and backend can be developed independently.
* Backend can serve web apps, mobile apps, or future clients.

**Example:**
React frontend → calls → `/api/v1/modules`
Backend → returns → JSON response

---

### 2️⃣ Statelessness

**What it means:**

* Each request contains all the information needed.
* Server does **not** store client session data.

**Why it matters:**

* Easier scaling
* Better performance

**Example:**
JWT token sent in every request:

```http
Authorization: Bearer <jwt_token>
```

---

### 3️⃣ Cacheability

**What it means:**

* Responses should define whether they can be cached.

**Why it matters:**

* Reduces server load
* Improves performance

**Example:**

```http
Cache-Control: public, max-age=3600
```

Used for read-only data like modules or badges.

---

### 4️⃣ Uniform Interface

**What it means:**

* Consistent URL patterns
* Proper HTTP methods
* Standard status codes

**Example:**

```http
GET    /api/v1/modules
POST   /api/v1/modules
GET    /api/v1/modules/:id
```

---

### 5️⃣ Layered System

**What it means:**

* API is divided into layers (routes, controllers, services, etc.)
* Each layer has a single responsibility

**Why it matters:**

* Clean code
* Easy debugging
* Easy maintenance

---

### 6️⃣ Code on Demand (Optional)

**What it means:**

* Server can send executable code (rare in practice)

**EcoLearn Status:**
❌ Not used (optional constraint)

---

## 5.2 Richardson Maturity Model (Levels 0–3)

This model explains **how RESTful an API really is**.

---

### 🔴 Level 0 – Single Endpoint (Not RESTful)

* One endpoint
* One HTTP method (usually POST)

❌ Example:

```http
POST /api
```

---

### 🟠 Level 1 – Resource-Based URLs

* Separate URLs for resources
* Still uses mostly POST

⚠️ Example:

```http
POST /api/users
POST /api/modules
```

---

### 🟢 Level 2 – HTTP Verbs + Status Codes (✅ Used)

* Uses proper HTTP methods
* Uses correct status codes

✅ Example:

```http
GET    /api/v1/modules
POST   /api/v1/challenges/:id/submit
PUT    /api/v1/submissions/:id/approve
```

👉 **EcoLearn India Backend follows Level 2**

---

### 🔵 Level 3 – HATEOAS (Advanced)

* Responses include links to next actions
* Rare in student projects

❌ Example:

```json
{
  "id": "123",
  "links": {
    "submit": "/api/v1/challenges/123/submit"
  }
}
```

---

## 5.3 HTTP Methods (CRUD Mapping)

| Method | Purpose                | Example            |
| ------ | ---------------------- | ------------------ |
| GET    | Read data              | Get modules        |
| POST   | Create new data        | Submit challenge   |
| PUT    | Update entire resource | Approve submission |
| PATCH  | Partial update         | Update profile     |
| DELETE | Remove resource        | Delete module      |

**Example:**

```http
PATCH /api/v1/users/me
```

---

## 5.4 HTTP Status Codes Usage

### ✅ 2xx – Success

| Code | Meaning    | When to Use          |
| ---- | ---------- | -------------------- |
| 200  | OK         | Data fetched/updated |
| 201  | Created    | Resource created     |
| 204  | No Content | Successful delete    |

---

### ⚠️ 4xx – Client Errors

| Code | Meaning              | When to Use      |
| ---- | -------------------- | ---------------- |
| 400  | Bad Request          | Invalid input    |
| 401  | Unauthorized         | No token         |
| 403  | Forbidden            | No permission    |
| 404  | Not Found            | Resource missing |
| 422  | Unprocessable Entity | Validation error |

---

### ❌ 5xx – Server Errors

| Code | Meaning               |
| ---- | --------------------- |
| 500  | Internal Server Error |
| 503  | Service Unavailable   |

---

## 5.5 Idempotency (Very Important Concept)

**What is idempotency?**
An operation is **idempotent** if calling it multiple times gives the **same result**.

---

### Idempotent Methods

✅ GET
✅ PUT
✅ DELETE

❌ POST (usually not idempotent)

---

**Example:**

```http
PUT /api/v1/submissions/123/approve
```

Calling this multiple times → submission remains approved.

---

# 6. API Architecture

EcoLearn India backend follows a **layered architecture** to keep the code clean, testable, and scalable.

---

## 6.1 Layered Architecture Diagram (Text-Based)

```
Client (React App)
       ↓
   Routes
       ↓
  Middleware
       ↓
 Controllers
       ↓
  Services
       ↓
Repositories
       ↓
   Models
       ↓
 MongoDB
```

---

## 6.2 Layer Responsibilities

| Layer        | Responsibility                   |
| ------------ | -------------------------------- |
| Routes       | Define API endpoints             |
| Middleware   | Auth, validation, error handling |
| Controllers  | Handle request & response        |
| Services     | Business logic                   |
| Repositories | Database queries                 |
| Models       | Database schema                  |

---

## 6.3 Code Examples (Layer by Layer)

---

### 📁 Routes Layer

```ts
// routes/module.routes.ts
router.get('/', moduleController.getAllModules);
```

---

### 📁 Middleware Layer

```ts
// middleware/auth.middleware.ts
export const protect = (req, res, next) => {
  if (!req.user) throw new UnauthorizedError();
  next();
};
```

---

### 📁 Controller Layer

```ts
// controllers/module.controller.ts
export const getAllModules = async (req, res) => {
  const modules = await moduleService.getAllModules();
  res.status(200).json({ success: true, data: modules });
};
```

---

### 📁 Service Layer

```ts
// services/module.service.ts
export const getAllModules = async () => {
  return moduleRepository.findAll();
};
```

---

### 📁 Repository Layer

```ts
// repositories/module.repository.ts
export const findAll = () => {
  return ModuleModel.find();
};
```

---

### 📁 Model Layer

```ts
// models/module.model.ts
const ModuleSchema = new Schema({
  title: String,
  difficulty: String
});
```

---

## 6.4 Why This Architecture?

✅ Easy to debug
✅ Easy to test
✅ Easy to scale
✅ Industry-standard practice
✅ Perfect for hackathons & real-world projects

---

# 7. API Versioning Strategy & Project Structure

This section explains **how API versions are managed** and **how the backend codebase is organized** so that the project remains scalable, maintainable, and industry-ready.

---

## 7.1 API Versioning Strategy

### 7.1.1 Why Version APIs?

API versioning is required to:

* Avoid breaking existing frontend clients
* Safely introduce new features
* Fix bugs without impacting production users
* Support multiple client versions simultaneously

**Without versioning:**
A small backend change can break the entire frontend.

---

### 7.1.2 URI Path Versioning Format

EcoLearn India uses **URI-based versioning**.

**Format:**

```http
/api/v1/<resource>
```

**Examples:**

```http
/api/v1/auth/login
/api/v1/users/me
/api/v1/modules
/api/v1/challenges/:id/submit
```

---

### 7.1.3 Semantic Versioning (SemVer)

EcoLearn India follows **Semantic Versioning**:

```
MAJOR.MINOR.PATCH
```

| Version Part | Meaning                            | Example |
| ------------ | ---------------------------------- | ------- |
| MAJOR        | Breaking changes                   | 2.0.0   |
| MINOR        | New features (backward compatible) | 1.1.0   |
| PATCH        | Bug fixes                          | 1.0.1   |

---

### 7.1.4 Version Progression Timeline

| Stage                | Version | Meaning          |
| -------------------- | ------- | ---------------- |
| Initial development  | 0.1.0   | Prototype        |
| Feature-complete MVP | 0.9.0   | Pre-release      |
| Stable release       | 1.0.0   | Production ready |
| Bug fix              | 1.0.1   | Patch            |
| New feature          | 1.1.0   | Minor update     |
| Breaking change      | 2.0.0   | Major update     |

---

### 7.1.5 NPM Version Commands

NPM automatically manages versions using **semantic versioning**.

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

**Example:**

```bash
npm version minor -m "Add challenge approval API"
```

---

### 7.1.6 Versioning Best Practices

✅ Never modify existing APIs in a breaking way
✅ Always introduce breaking changes in a new major version
✅ Keep older versions running until clients migrate
✅ Document deprecated APIs
✅ Version API routes, not business logic

---

## 7.2 Application Structure

EcoLearn India backend follows a **clean, layered folder structure**.

---

### 7.2.1 Complete Folder Structure

```
src/
├── app.ts
├── server.ts
├── config/
│   ├── db.ts
│   └── env.ts
├── routes/
│   ├── index.ts
│   ├── auth.routes.ts
│   └── user.routes.ts
├── controllers/
│   ├── auth.controller.ts
│   └── user.controller.ts
├── services/
│   ├── auth.service.ts
│   └── user.service.ts
├── repositories/
│   └── user.repository.ts
├── models/
│   └── user.model.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── validators/
│   └── user.validator.ts
├── utils/
│   ├── jwt.ts
│   ├── logger.ts
│   └── response.ts
├── constants/
│   └── roles.ts
└── types/
    └── express.d.ts
```

---

### 7.2.2 File Naming Conventions

| Type       | Convention                 | Example            |
| ---------- | -------------------------- | ------------------ |
| Routes     | `<resource>.routes.ts`     | user.routes.ts     |
| Controller | `<resource>.controller.ts` | user.controller.ts |
| Service    | `<resource>.service.ts`    | user.service.ts    |
| Repository | `<resource>.repository.ts` | user.repository.ts |
| Model      | `<resource>.model.ts`      | user.model.ts      |
| Middleware | `<name>.middleware.ts`     | auth.middleware.ts |
| Validator  | `<resource>.validator.ts`  | user.validator.ts  |

---

## 7.3 Code Organization for One Resource (User)

This section shows the **end-to-end flow** for a single resource.

---

### 7.3.1 User Model

```ts
// models/user.model.ts
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  ecoPoints: Number
});
```

---

### 7.3.2 User Repository

```ts
// repositories/user.repository.ts
export const findByEmail = (email: string) => {
  return UserModel.findOne({ email });
};
```

---

### 7.3.3 User Service

```ts
// services/user.service.ts
export const getUserByEmail = async (email: string) => {
  return userRepository.findByEmail(email);
};
```

---

### 7.3.4 User Controller

```ts
// controllers/user.controller.ts
export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};
```

---

### 7.3.5 User Routes

```ts
// routes/user.routes.ts
router.get('/me', protect, userController.getProfile);
```

---

### 7.3.6 Complete Request Flow

```
Client
 ↓
Routes (/api/v1/users/me)
 ↓
Middleware (auth)
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Model
 ↓
Database
```

---

## 7.4 Benefits of This Structure

✅ Easy onboarding for new developers
✅ Clean separation of concerns
✅ Simple testing & debugging
✅ Scales for large applications
✅ Industry-standard backend design

---

Below is **PROMPT 4** completed exactly in the style of your PRD—clear, student-friendly, and production-ready.

---

# 🔌 API Endpoints & Response Formats

This section defines **standardized API endpoint specifications and response formats** for EcoLearn India.
All APIs follow **REST principles**, are **versioned**, and return **consistent JSON responses** to simplify frontend integration and debugging.

---

## 1️⃣ API Endpoints Specification

### 🔖 Base API Standards

* **Base URL:** `/api/v1`
* **Authentication:** JWT (Authorization: `Bearer <token>`)
* **Content-Type:** `application/json`
* **File Uploads:** `multipart/form-data`
* **Pagination:** Query-based (`page`, `limit`)
* **Sorting:** `sortBy`, `order`
* **Filtering:** Query params

---

### 📄 Endpoint Documentation Template

Use this template for **every API endpoint**:

```md
### [HTTP METHOD] /api/v1/resource/path

**Description:**
Brief explanation of what this endpoint does.

**Authentication:**
Public / Student / Teacher / Admin

**Request Params:**
- Path Params:
- Query Params:
- Body:

**Success Response:**
Status Code + JSON structure

**Error Responses:**
Possible errors with status codes
```

---

## 2️⃣ Core Resources & Endpoints Checklist

### 👤 Auth & Users

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register student    |
| POST   | `/auth/login`    | Login               |
| GET    | `/auth/me`       | Get logged-in user  |
| PUT    | `/users/:id`     | Update profile      |
| DELETE | `/users/:id`     | Delete user (admin) |

---

### 📘 Modules

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | `/modules`     | List modules          |
| GET    | `/modules/:id` | Module details        |
| POST   | `/modules`     | Create module (admin) |
| PUT    | `/modules/:id` | Update module         |
| DELETE | `/modules/:id` | Delete module         |

---

### 📚 Lessons

| Method | Endpoint               | Description   |
| ------ | ---------------------- | ------------- |
| GET    | `/modules/:id/lessons` | List lessons  |
| POST   | `/modules/:id/lessons` | Add lesson    |
| PUT    | `/lessons/:id`         | Update lesson |
| DELETE | `/lessons/:id`         | Delete lesson |

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
| POST   | `/challenges/:id/submit`   | Submit challenge   |
| PUT    | `/submissions/:id/approve` | Approve submission |

---

### 🏆 Leaderboard

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/leaderboard/school/:id`   | School leaderboard   |
| GET    | `/leaderboard/state/:state` | State leaderboard    |
| GET    | `/leaderboard/national`     | National leaderboard |

---

## 3️⃣ Detailed Example: GET Modules Endpoint

### GET `/api/v1/modules`

**Description:**
Fetch paginated list of learning modules with filters.

**Authentication:**
Student / Teacher / Admin

---

### 🔍 Query Parameters

| Param      | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| page       | number | Page number (default: 1)     |
| limit      | number | Items per page (default: 10) |
| difficulty | string | Beginner / Intermediate      |
| search     | string | Module title search          |
| sortBy     | string | title / createdAt            |
| order      | string | asc / desc                   |

---

### 📥 Request Example

```http
GET /api/v1/modules?page=1&limit=5&difficulty=Beginner&search=climate
Authorization: Bearer <token>
```

---

### 📤 Success Response (200)

```json
{
  "success": true,
  "message": "Modules fetched successfully",
  "data": {
    "items": [
      {
        "_id": "64fa...",
        "title": "Climate Change Basics",
        "difficulty": "Beginner",
        "lessonsCount": 5,
        "ecoPoints": 50
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "totalItems": 12,
      "totalPages": 3
    }
  }
}
```

---

## 4️⃣ Response Format Standards

### ✅ Success Response Interface

```ts
export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}
```

---

### ❌ Error Response Interface

```ts
export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
  errors?: string[];
}
```

---

## 5️⃣ Common Response Examples

### 🔹 Single Resource

```json
{
  "success": true,
  "message": "Module fetched",
  "data": {
    "_id": "64fa...",
    "title": "Climate Change Basics"
  }
}
```

---

### 🔹 List with Pagination

```json
{
  "success": true,
  "message": "Challenges fetched",
  "data": {
    "items": [...],
    "pagination": {
      "page": 2,
      "limit": 10,
      "totalPages": 4
    }
  }
}
```

---

### 🔹 Created Resource (201)

```json
{
  "success": true,
  "message": "Challenge created successfully",
  "data": {
    "_id": "65ab...",
    "title": "Tree Plantation"
  }
}
```

---

### 🔹 Deleted Resource (200)

```json
{
  "success": true,
  "message": "Module deleted successfully",
  "data": null
}
```

---

### 🔹 Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required",
    "Difficulty must be Beginner or Intermediate"
  ]
}
```

---

### 🔹 Unauthorized (401)

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

## 6️⃣ Response Utility Class (Backend)

```ts
export class ApiResponse {
  static success<T>(data: T, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, errors?: string[], code?: string) {
    return {
      success: false,
      message,
      errorCode: code,
      errors,
    };
  }
}
```

---

## ✅ Summary

✔ REST-compliant endpoints
✔ Consistent response structure
✔ Pagination & filtering support
✔ Type-safe frontend integration
✔ Ready for production & hackathon demo

---
Below is **PROMPT 5** completed in the same **clean, hackathon-ready, student-friendly PRD style** you’ve been using for EcoLearn India.

---

# ⚠️ Error Handling & Validation

This section defines a **robust error handling architecture** and **scalable database schema design** for EcoLearn India.
The goal is to ensure **predictable errors, clean validation, and developer-friendly debugging** across the MERN stack.

---

## 1️⃣ Error Handling Strategy

### 🎯 Objectives

* Centralized and consistent error responses
* Clear separation of **operational errors** vs **programming errors**
* Type-safe errors using TypeScript
* Proper handling of MongoDB/Mongoose-specific errors
* Cleaner async route handlers (no repetitive try–catch)

---

## 1.1 Custom `ApiError` Class

### Purpose

* Standardize application errors
* Carry HTTP status codes
* Distinguish operational errors

### `ApiError.ts`

```ts
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

---

## 1.2 Async Error Wrapper Utility

### Purpose

* Avoid repetitive `try/catch` in controllers
* Automatically forward errors to global handler

### `catchAsync.ts`

```ts
import { Request, Response, NextFunction } from 'express';

export const catchAsync =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
```

### Usage Example

```ts
router.get(
  '/modules',
  catchAsync(async (req, res) => {
    const modules = await Module.find();
    res.status(200).json(ApiResponse.success(modules));
  })
);
```

---

## 1.3 Global Error Handler Middleware

### Purpose

* Single place to handle **all application errors**
* Format errors consistently for frontend
* Log errors safely

### `errorHandler.ts`

```ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  // Default values
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(
      (val: any) => val.message
    );
    error = new ApiError('Validation Error', 400);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Mongoose CastError (Invalid ObjectId)
  if (err.name === 'CastError') {
    error = new ApiError('Invalid ID format', 400);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(`${field} already exists`, 409);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError('Invalid token. Please login again.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError('Token expired. Please login again.', 401);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
```

---

## 1.4 Error Types & Handling Summary

| Error Type       | HTTP Code | Handling             |
| ---------------- | --------- | -------------------- |
| Validation Error | 400       | Field-level messages |
| Invalid ObjectId | 400       | CastError            |
| Duplicate Key    | 409       | MongoDB unique index |
| Unauthorized     | 401       | JWT issues           |
| Forbidden        | 403       | Role-based access    |
| Not Found        | 404       | Missing resource     |
| Server Error     | 500       | Fallback             |

---

## 2️⃣ Database Schema Design

### 🎯 Schema Design Principles

1. **Single Responsibility** – One schema = one domain concept
2. **Reference over Embed** – For scalable relationships
3. **Indexes for Performance** – Queries first, schema second
4. **Validation at DB Level** – Never trust client input
5. **Role-based Fields** – Minimal data exposure
6. **Timestamps Everywhere** – For analytics & audits

---

## 2.1 Example Resource: **User Schema**

### Supported Roles

* `student`
* `teacher`
* `admin`

---

### TypeScript Interface

```ts
import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  schoolId?: Types.ObjectId;
  grade?: number;
  ecoPoints: number;
  streak: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

### Mongoose Schema

```ts
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
```

---

### Indexes

```ts
UserSchema.index({ email: 1 });
UserSchema.index({ schoolId: 1, ecoPoints: -1 });
```

---

### Password Hashing Middleware

```ts
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```

---

### Instance Method (Optional)

```ts
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

---

### Model Export

```ts
export const User = mongoose.model<IUser>('User', UserSchema);
```

---

## 2.2 Schema Checklist for All Resources

### 📘 Modules

* title (required, indexed)
* description
* difficulty (enum)
* lessons (ref)
* quiz (ref)
* ecoPoints
* createdBy (admin)

---

### 📚 Lessons

* title
* content
* videoUrl
* moduleId (indexed)
* order

---

### 🧠 Quiz

* moduleId (indexed)
* questions[]
* correctAnswers
* totalMarks

---

### 🌱 Challenges

* title
* description
* points
* difficulty
* image
* isActive
* createdBy

---

### 📸 Submissions

* challengeId
* studentId
* imageUrl
* status (pending/approved/rejected)
* reviewedBy

---

### 🏆 Badges

* name
* icon
* criteria
* pointsRequired

---

### 🏫 School

* name
* board (CBSE/ICSE/State)
* city
* state
* isVerified

---

## ✅ Summary

✔ Centralized error handling
✔ Clean async controller code
✔ MongoDB & JWT error coverage
✔ Strong schema validation
✔ Indexed for leaderboard & analytics
✔ Production-ready & hackathon-safe

---

If you want, next we can generate:

👉 **PROMPT 6: Authentication, Authorization & Role-Based Access Control**


Below is **PROMPT 6** completed in a **professional, hackathon-ready, and industry-aligned** format that fits seamlessly into your EcoLearn India PRD.

---

# 🛠️ Development Workflow & Git

This section defines the **end-to-end development workflow**, **Git practices**, and **API documentation standards** used in EcoLearn India to ensure scalability, collaboration, and clean code delivery.

---

## 1️⃣ Development Workflow

### 🎯 Goals

* Predictable and repeatable development process
* Clean separation of concerns
* Easy debugging and testing
* Team-friendly Git collaboration

---

## 1.1 Order of Development (Backend)

EcoLearn India follows a **layered, bottom-up approach**:

### **Step-by-Step Flow (Step 1 → 7)**

```
Model → Repository → Service → Controller → Routes → Validation → Testing
```

---

### **Step 1: Model (Database Layer)**

* Define Mongoose schema
* Add validations and indexes
* Handle pre/post hooks

```ts
// models/User.model.ts
export const User = mongoose.model('User', UserSchema);
```

---

### **Step 2: Repository (Data Access Layer)**

* Direct database interaction
* No business logic

```ts
// repositories/user.repository.ts
export const findUserByEmail = (email: string) =>
  User.findOne({ email });
```

---

### **Step 3: Service (Business Logic Layer)**

* Core application logic
* Combines multiple repositories

```ts
// services/user.service.ts
export const createUser = async (data: CreateUserDTO) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new ApiError('Email already exists', 409);
  return User.create(data);
};
```

---

### **Step 4: Controller (Request Handling)**

* Handles HTTP request & response
* No DB queries here

```ts
// controllers/user.controller.ts
export const registerUser = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(ApiResponse.success(user, 'User registered'));
});
```

---

### **Step 5: Routes**

* Define endpoints
* Attach middleware

```ts
// routes/user.routes.ts
router.post('/register', registerUser);
```

---

### **Step 6: Validation**

* Zod / Joi validation
* Validate body, params, queries

```ts
// validators/user.validator.ts
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
```

---

### **Step 7: Testing**

* Unit tests (services)
* Integration tests (routes)
* Manual API testing (Postman/Swagger)

---

## 1.2 Git Workflow (Backend)

EcoLearn India uses a **feature-based Git workflow**.

### 🧩 Branch Structure

```
main        → Production-ready code
develop     → Active development
feature/*   → New features
bugfix/*    → Bug fixes
hotfix/*    → Critical production fixes
```

---

### 🔀 Development Flow

1. Create feature branch from `develop`
2. Commit changes
3. Open Pull Request to `develop`
4. Review + merge
5. Release → merge `develop` → `main`

---

## 1.3 Branch Naming Conventions

```bash
feature/auth-login
feature/module-crud
bugfix/token-expiry
hotfix/payment-crash
```

**Format:**

```
<type>/<short-description>
```

---

## 1.4 Commit Message Format (Conventional Commits)

### 📌 Format

```
<type>(scope): short description
```

### ✅ Allowed Types

| Type     | Meaning          |
| -------- | ---------------- |
| feat     | New feature      |
| fix      | Bug fix          |
| docs     | Documentation    |
| refactor | Code improvement |
| test     | Add/update tests |
| chore    | Config / tooling |

---

### 📌 Examples

```bash
feat(auth): add JWT login
fix(user): prevent duplicate email
docs(api): add swagger documentation
refactor(service): optimize leaderboard query
```

---

## 1.5 Version Progression Timeline

| Version | Stage            | Description          |
| ------- | ---------------- | -------------------- |
| v0.1.0  | Initial Setup    | Project scaffold     |
| v0.2.0  | Auth Ready       | Login & roles        |
| v0.3.0  | Learning Modules | Lessons + quizzes    |
| v0.4.0  | Challenges       | Photo upload         |
| v0.5.0  | Gamification     | Badges + leaderboard |
| v1.0.0  | MVP Release      | Hackathon demo       |

---

## 2️⃣ OpenAPI Specification (Swagger)

---

## 2.1 What is OpenAPI / Swagger?

**OpenAPI** is a standard for documenting REST APIs.
**Swagger UI** provides a live, interactive API explorer.

### Benefits

* Auto-generated documentation
* Frontend-backend contract
* Live API testing
* Hackathon demo-ready

---

## 2.2 Setup Instructions (Express + TypeScript)

### 📦 Install Dependencies

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

### 📁 Swagger Config

```ts
// config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoLearn India API',
      version: '1.0.0',
      description: 'API documentation for EcoLearn India',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
});
```

---

### 🔗 Swagger Route

```ts
// app.ts
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## 2.3 JSDoc Annotation Example

### Documenting an Endpoint

```ts
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
```

---

## 2.4 How to Document Endpoints (Checklist)

For every endpoint:

* Path & method
* Summary & description
* Tags (Auth, Modules, Challenges)
* Request body schema
* Query/Path parameters
* Response status codes
* Auth requirement

---

## 2.5 Swagger UI Output

After setup, visit:

```
http://localhost:5000/api-docs
```

You get:

* Interactive API explorer
* Request/response preview
* Try-it-out feature
* Frontend integration support

---

## ✅ Summary

✔ Clean step-by-step development workflow
✔ Scalable Git strategy
✔ Industry-standard commit conventions
✔ Versioned MVP roadmap
✔ Auto-generated API documentation
✔ Hackathon & production-ready

---

### 🚀 Next (Optional Prompts)

* **PROMPT 7:** File Upload, Image Validation & Cloud Storage
  Below is **PROMPT 7** completed as the **final, production-ready section** of your EcoLearn India PRD.
  It is **hackathon-safe, industry-aligned, and student-friendly**, completing the full backend lifecycle from testing to deployment and documentation.

---

# 🧪 Testing & Deployment

This section defines the **testing strategy**, **deployment plan**, and **documentation standards** for EcoLearn India to ensure reliability, scalability, and smooth handover.

---

## 1️⃣ Testing Strategy

### 🎯 Goals

* Catch bugs early
* Ensure API correctness
* Prevent regressions
* Confidence during demo & deployment

EcoLearn India follows a **layered testing pyramid**.

---

## 1.1 Testing Levels

### 🔹 Unit Testing

**What is tested:**

* Services
* Utility functions
* Business logic

**Tools:**

* Jest
* ts-jest

**Example:**

* `user.service.test.ts`
* `leaderboard.service.test.ts`

---

### 🔹 Integration Testing

**What is tested:**

* API endpoints
* Middleware
* Database integration

**Tools:**

* Jest
* Supertest
* In-memory MongoDB / Test DB

---

### 🔹 End-to-End (E2E) Testing

**What is tested:**

* Full user flow
* Auth → modules → challenges → leaderboard

**Tools (optional for MVP):**

* Postman Collections
* Playwright / Cypress (future)

---

### 📊 Testing Pyramid

```
          E2E (Few)
     Integration (Some)
  Unit Tests (Many)
```

---

## 1.2 Manual Testing (Postman Checklist)

### 🔐 Authentication

* [ ] Register new student
* [ ] Login with valid credentials
* [ ] Login with invalid credentials
* [ ] Access protected route without token
* [ ] Access protected route with token

---

### 📘 Modules

* [ ] Fetch module list
* [ ] Fetch single module
* [ ] Create module (admin only)
* [ ] Invalid module ID handling

---

### 🌱 Challenges

* [ ] Submit challenge with image
* [ ] Submit challenge without image (fail)
* [ ] Approve submission (teacher)
* [ ] Rejected submission flow

---

### 🏆 Leaderboard

* [ ] School leaderboard
* [ ] State leaderboard
* [ ] National leaderboard
* [ ] Sorting by ecoPoints

---

## 1.3 Example Automated Test (Jest + Supertest)

### Test: Auth Login API

```ts
import request from 'supertest';
import app from '../app';

describe('POST /api/v1/auth/login', () => {
  it('should login user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'student@test.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('should fail with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'student@test.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
```

---

## 2️⃣ Deployment Plan

### 🎯 Goals

* Simple one-click deployment
* Secure environment handling
* Easy rollback
* Hackathon demo reliability

---

## 2.1 Environment Setup

### 🌍 Environment Table

| Environment | Purpose          | DB            | URL              |
| ----------- | ---------------- | ------------- | ---------------- |
| Development | Local coding     | Local MongoDB | `localhost:5000` |
| Staging     | Pre-demo testing | MongoDB Atlas | staging URL      |
| Production  | Live demo        | MongoDB Atlas | production URL   |

---

## 2.2 Deployment Platforms Comparison

| Platform    | Best For     | Pros                       | Cons              |
| ----------- | ------------ | -------------------------- | ----------------- |
| **Railway** | Hackathons   | Easy env vars, fast deploy | Limited free tier |
| **Render**  | Backend APIs | Stable, free tier          | Cold starts       |
| **Vercel**  | Frontend     | Best for React/Vite        | Backend limits    |

### ✅ Recommended Setup

* **Backend:** Render / Railway
* **Frontend:** Vercel
* **Database:** MongoDB Atlas

---

## 2.3 Deployment Checklist

### ✅ Before Deployment

* [ ] `.env` added to `.gitignore`
* [ ] Production build tested locally
* [ ] API base URL updated
* [ ] Swagger docs working
* [ ] Error handling tested
* [ ] Image upload limits enforced

---

### 🚀 After Deployment

* [ ] Health check endpoint working
* [ ] Auth flow tested
* [ ] File uploads verified
* [ ] Leaderboard queries performant
* [ ] Logs monitored
* [ ] Demo flow rehearsed

---

## 2.4 Environment Variables Template

### `.env.example`

```env
# App
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ecolearn

# Auth
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# CORS
CLIENT_URL=https://ecolearn.vercel.app
```

---

## 3️⃣ Documentation Checklist

### 📁 Required Documentation Files

#### 📄 README.md

* Project overview
* Tech stack
* Setup instructions
* API docs link
* Demo credentials

---

#### 🤝 CONTRIBUTING.md

* Branching rules
* Commit conventions
* PR guidelines
* Code style rules

---

#### 📜 LICENSE

* MIT License (recommended)
* Hackathon-safe and open-source

---

#### 🧾 CHANGELOG.md

* Version history
* Features added
* Bug fixes

```md
## v1.0.0
- MVP release
- Auth, modules, challenges, leaderboard
```

---

## ✅ Final Summary

✔ Layered testing strategy
✔ Manual + automated testing
✔ Simple & scalable deployment
✔ Secure environment handling
✔ Complete documentation set
✔ Demo-ready for Smart India Hackathon

---

Below is **PROMPT 8** — the **final assembly** that completes the EcoLearn India PRD in a clean, submission-ready format.

---

# 🏁 Final Assembly & Resources

This section finalizes the Product Requirements Document with **success metrics**, **future roadmap**, **references**, **appendix**, and a **complete Table of Contents** covering all sections created from PROMPT 1 → PROMPT 8.

---

## 1️⃣ Success Metrics (Phase 1 – MVP Completion)

### 🎯 Phase 1 Objective

Deliver a **fully functional, demo-ready MVP** within **12 days** for Smart India Hackathon 2025.

---

### ✅ Technical Success Criteria

| Area           | Completion Criteria                                 |
| -------------- | --------------------------------------------------- |
| Authentication | Student, Teacher, Admin login works with JWT        |
| Core APIs      | Modules, Quizzes, Challenges, Leaderboard APIs live |
| Database       | MongoDB schemas validated & indexed                 |
| Error Handling | Centralized error handler working                   |
| Validation     | Zod/Mongoose validation enforced                    |
| File Upload    | Image upload with size/type validation              |
| Swagger Docs   | `/api-docs` accessible and complete                 |
| Deployment     | Backend + Frontend deployed successfully            |

---

### 🎓 Product Success Criteria

| Feature          | Metric                              |
| ---------------- | ----------------------------------- |
| Learning Modules | ≥5 modules with quizzes             |
| Eco-Challenges   | ≥5 challenges with submission flow  |
| Gamification     | Points, badges, leaderboard visible |
| Dashboard        | Student dashboard fully functional  |
| Responsiveness   | Mobile + desktop tested             |
| Accessibility    | WCAG 2.1 AA baseline met            |

---

### 🧪 Demo Readiness Checklist

* [x] Login demo account ready
* [x] Sample data seeded
* [x] No blocking bugs
* [x] Stable deployment URL
* [x] API & UI flows rehearsed

---

## 2️⃣ Next Steps – Phase 2 Preview (Post-Hackathon)

Phase 2 focuses on **scale, intelligence, and deeper impact**.

---

### 🚀 Feature Enhancements

* AI-based challenge verification (image analysis)
* Adaptive learning paths based on performance
* Multilingual support (Hindi + regional languages)
* Push notifications & email alerts
* Offline-first mobile experience (PWA)

---

### 📊 Advanced Analytics

* CO₂ impact estimation
* School & district-level reports
* Teacher performance insights
* Admin system-wide dashboards

---

### 🤝 Ecosystem Integrations

* Government environmental APIs
* School ERP integrations
* NGO partnerships
* CSR program onboarding

---

## 3️⃣ Resources & References

### 📘 Official Documentation

* React: [https://react.dev](https://react.dev)
* TypeScript: [https://www.typescriptlang.org](https://www.typescriptlang.org)
* Node.js: [https://nodejs.org](https://nodejs.org)
* Express.js: [https://expressjs.com](https://expressjs.com)
* MongoDB: [https://www.mongodb.com/docs](https://www.mongodb.com/docs)
* MongoDB Atlas: [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
* Swagger / OpenAPI: [https://swagger.io/docs](https://swagger.io/docs)

---

### 🎓 Learning Resources

* MongoDB University (Free Courses)
* MDN Web Docs
* REST API Design Guidelines
* OWASP Top 10 (API Security)
* WCAG 2.1 Accessibility Guidelines

---

### 🧰 Tools Used

* Vite + React + TypeScript
* TailwindCSS + DaisyUI
* Zustand + React Query
* Jest + Supertest
* Postman
* Swagger UI
* GitHub
* Vercel / Render / Railway

---

## 4️⃣ Appendix

---

### A. Glossary of Terms

| Term  | Meaning                              |
| ----- | ------------------------------------ |
| MVP   | Minimum Viable Product               |
| REST  | Representational State Transfer      |
| JWT   | JSON Web Token                       |
| WCAG  | Web Content Accessibility Guidelines |
| RBAC  | Role-Based Access Control            |
| CRUD  | Create, Read, Update, Delete         |
| CI/CD | Continuous Integration / Deployment  |

---

### B. Troubleshooting Guide

#### ❌ MongoDB Connection Failed

**Solution:**

* Check `MONGO_URI`
* Ensure IP whitelist in Atlas
* Verify credentials

---

#### ❌ JWT Unauthorized Error

**Solution:**

* Ensure token is sent as `Bearer <token>`
* Check token expiry
* Validate `JWT_SECRET`

---

#### ❌ Image Upload Not Working

**Solution:**

* Verify `multipart/form-data`
* Check file size limit
* Confirm upload directory permissions

---

### C. Common Issues & Solutions

| Issue            | Cause               | Fix                      |
| ---------------- | ------------------- | ------------------------ |
| 500 Error        | Unhandled exception | Use global error handler |
| 404 API          | Wrong route         | Check API base URL       |
| Validation Error | Bad input           | Check Zod schema         |
| Slow Leaderboard | Missing index       | Add compound index       |

---

## 5️⃣ Document Version History

| Version | Date     | Description                |
| ------- | -------- | -------------------------- |
| 0.1     | Nov 2024 | Initial concept            |
| 0.5     | Dec 2024 | Core PRD drafted           |
| 0.8     | Dec 2024 | Backend architecture added |
| 1.0     | Dec 2024 | Final hackathon-ready PRD  |

---

# 📚 Complete Table of Contents (Final)

1. [Project Information](#project-information)
2. [Learning Objectives](#learning-objectives)
3. [Technology Stack](#technology-stack)
4. [MVP Scope](#mvp-scope---12-days)
5. [Target Users / Personas](#target-users--personas)
6. [Branding, Theming & Visual Identity](#branding-theming--visual-identity)
7. [UI/UX Design System](#uiux-design-system)
8. [Component Design System](#component-design-system)
9. [Wireframe Structure](#wireframe-structure-key-pages)
10. [12-Day Development Roadmap](#12-day-development-roadmap)
11. [REST Principles & API Architecture](#rest-principles--api-architecture)
12. [API Endpoints & Response Formats](#api-endpoints--response-formats)
13. [Error Handling & Validation](#error-handling--validation)
14. [Development Workflow & Git](#development-workflow--git)
15. [Testing & Deployment](#testing--deployment)
16. [Success Metrics](#success-metrics-phase-1--mvp-completion)
17. [Next Steps – Phase 2 Preview](#next-steps--phase-2-preview-post-hackathon)
18. [Resources & References](#resources--references)
19. [Appendix](#appendix)
20. [Document Version History](#document-version-history)

---





