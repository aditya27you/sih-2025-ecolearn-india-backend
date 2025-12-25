# Tasks: EcoLearn India Backend Implementation

## Phase 1: Setup & Infrastructure
> **Goal**: Initialize the application core, middleware, and database connection.
> **Test Criteria**: Server starts successfully, connects to DB, health check endpoint returns 200, global error handler works.

- [x] T001 Initialize `src/app.ts` with Express, CORS, Helmet, and middleware mounting
- [x] T002 Configure `src/server.ts` to connect to MongoDB and start the server
- [x] T003 Create `src/middlewares/error.middleware.ts` for global error handling (wrapping `ApiError`)
- [x] T004 Create `src/middlewares/auth.middleware.ts` for JWT verification
- [x] T005 Create `src/middlewares/validate.middleware.ts` for Zod validation integration
- [ ] T006 Create `src/routes/index.ts` (or `server.ts` in routes) as main router entry point

## Phase 2: User Story 1 - Authentication & User Management
> **Goal**: Users (Students, Teachers) can register, login, and manage their profiles.
> **Test Criteria**: Can register new user, login to get JWT, access protected `/me` route.

- [ ] T007 [US1] Create User model in `src/models/user.model.ts`
- [ ] T008 [US1] Create User repository in `src/repositories/user.repository.ts`
- [ ] T009 [US1] Create Auth service in `src/services/auth.service.ts` (login, register)
- [ ] T010 [US1] Create User service in `src/services/user.service.ts` (profile management)
- [ ] T011 [US1] Create Auth controller in `src/controllers/auth.controller.ts`
- [ ] T012 [US1] Create User controller in `src/controllers/user.controller.ts`
- [ ] T013 [US1] Create Auth routes in `src/routes/auth.routes.ts`
- [ ] T014 [US1] Create User routes in `src/routes/user.routes.ts`
- [ ] T015 [US1] Register Auth and User routes in `src/app.ts` (or main router)

## Phase 3: User Story 2 - Educational Content (Modules & Lessons)
> **Goal**: Users can view learning modules and lessons. Admins can manage them.
> **Test Criteria**: Can CRUD modules and lessons, nested lessons appear in module details.

- [ ] T016 [US2] Create Module model in `src/models/module.model.ts`
- [ ] T017 [US2] Create Lesson model in `src/models/lesson.model.ts`
- [ ] T018 [US2] Create Module repository in `src/repositories/module.repository.ts`
- [ ] T019 [US2] Create Lesson repository in `src/repositories/lesson.repository.ts`
- [ ] T020 [US2] Create Module service in `src/services/module.service.ts`
- [ ] T021 [US2] Create Lesson service in `src/services/lesson.service.ts`
- [ ] T022 [US2] Create Module controller in `src/controllers/module.controller.ts`
- [ ] T023 [US2] Create Lesson controller in `src/controllers/lesson.controller.ts`
- [ ] T024 [US2] Create Module routes in `src/routes/module.routes.ts` (include nested lesson routes)
- [ ] T025 [US2] Register Module routes in `src/app.ts`

## Phase 4: User Story 3 - Quizzes & Assessments
> **Goal**: Users can take quizzes linked to modules.
> **Test Criteria**: Can retrieve quiz for a module, submit answers, get graded result.

- [ ] T026 [US3] Create Quiz model in `src/models/quiz.model.ts`
- [ ] T027 [US3] Create Quiz repository in `src/repositories/quiz.repository.ts`
- [ ] T028 [US3] Create Quiz service in `src/services/quiz.service.ts` (grading logic)
- [ ] T029 [US3] Create Quiz controller in `src/controllers/quiz.controller.ts`
- [ ] T030 [US3] Create Quiz routes in `src/routes/quiz.routes.ts`
- [ ] T031 [US3] Register Quiz routes in `src/app.ts`

## Phase 5: User Story 4 - Challenges & Submissions
> **Goal**: Users can view challenges and upload proof (images).
> **Test Criteria**: Can list challenges, submit image (multipart/form-data), admin can approve.

- [ ] T032 [US4] Create Challenge model in `src/models/challenge.model.ts`
- [ ] T033 [US4] Create Submission model in `src/models/submission.model.ts`
- [ ] T034 [US4] Create Challenge repository in `src/repositories/challenge.repository.ts`
- [ ] T035 [US4] Create Submission repository in `src/repositories/submission.repository.ts`
- [ ] T036 [US4] Create Challenge service in `src/services/challenge.service.ts`
- [ ] T037 [US4] Create Challenge controller in `src/controllers/challenge.controller.ts` (handle file upload)
- [ ] T038 [US4] Create Challenge routes in `src/routes/challenge.routes.ts`
- [ ] T039 [US4] Register Challenge routes in `src/app.ts`

## Phase 6: User Story 5 - Gamification & Leaderboards
> **Goal**: Users can see their ranking and stats.
> **Test Criteria**: Leaderboard returns correct ranking based on eco-points.

- [ ] T040 [US5] Create Leaderboard service in `src/services/leaderboard.service.ts` (aggregation logic)
- [ ] T041 [US5] Create Leaderboard controller in `src/controllers/leaderboard.controller.ts`
- [ ] T042 [US5] Create Leaderboard routes in `src/routes/leaderboard.routes.ts`
- [ ] T043 [US5] Register Leaderboard routes in `src/app.ts`

## Phase 7: Polish & Documentation
> **Goal**: Ensure code quality and documentation.
> **Test Criteria**: Swagger UI is accessible and shows all endpoints.

- [ ] T044 Add Swagger annotations to `src/routes/*.ts` files
- [ ] T045 Finalize `src/config/swagger.ts` configuration
- [ ] T046 Verify `src/app.ts` mounts Swagger UI at `/api-docs`

## Dependencies
- US1 (Auth) blocks all other stories (User ID required for most operations).
- US2 (Modules) is prerequisite for US3 (Quizzes) as quizzes are linked to modules.
- US4 (Challenges) and US5 (Leaderboards) are relatively independent but rely on User data.

## Implementation Strategy
- Implement Phase 1 & 2 first to establish the foundation.
- Phases 3, 4, 5 can be implemented in parallel if multiple developers, otherwise sequential.
- Use TDD where possible: Write test -> Fail -> Implement -> Pass.
