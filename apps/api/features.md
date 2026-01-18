# Features Status

## User Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (In-Memory -> Prisma WIP)
- [x] Presentation Layer
- [x] Architecture Compliance: Strictly follows async/await + AppError patterns (v2 rules).

### Use Cases

- CreateUser (Register): Allows a new user to sign up.
- GetUser: Retrieves user details by ID.
- GetUsers: Retrieves all users.

### Ports

- UserRepository: Persistence access for users.

### Endpoints

- POST /users: Create a user.
- GET /users/:id: Get a user.
- GET /users: Get all users.

### Errors

- USER_ALREADY_EXISTS
- USER_NOT_FOUND
- INVALID_USER_DATA

### Missing

- Real database persistence (currently using In-Memory adapter).
- Authentication/Authorization integration.

## Organization Feature (Domain Only)

### Status

- [x] Domain Layer (Entity defined)

## Project Feature (Domain Only)

### Status

- [x] Domain Layer (Entity defined)

## Task Feature (Domain Only)

### Status

- [x] Domain Layer (Entities: Task, TaskComment defined)
- [x] Enums: TaskStatus, TaskPriority

## Tag Feature (Domain Only)

### Status

- [x] Domain Layer (Entity: Tag defined)

## Infrastructure

- [x] Database: Prisma Schema defined (User, Organization, Project, Task, TaskComment, Tag).
- [x] Database: Prisma Client generated.
