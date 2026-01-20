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
- UpdateUser: Updates user details.
- DeleteUser: Deletes a user.

### Ports

- UserRepository: Persistence access for users.

### Endpoints

- POST /users: Create a user.
- GET /users/:id: Get a user.
- GET /users: Get all users.
- PUT /users/:id: Update a user.
- DELETE /users/:id: Delete a user.

### Errors

- USER_ALREADY_EXISTS
- USER_NOT_FOUND
- INVALID_USER_DATA

### Missing

- Real database persistence (currently using In-Memory adapter).
- Authentication/Authorization integration.

## Organization Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (Prisma)
- [x] Presentation Layer
- [x] Architecture Compliance

### Use Cases

- CreateOrganization: Create a new organization.
- GetOrganization: Get organization by ID.
- GetOrganizations: List all organizations.
- UpdateOrganization: Update organization details.
- DeleteOrganization: Delete an organization.

### Ports

- OrganizationRepository: Persistence access for organizations.

### Endpoints

- POST /organizations: Create organization.
- GET /organizations/:id: Get organization.
- GET /organizations: List organizations.
- PUT /organizations/:id: Update organization.
- DELETE /organizations/:id: Delete organization.

### Errors

- ORGANIZATION_NOT_FOUND
- ORGANIZATION_ALREADY_EXISTS

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
