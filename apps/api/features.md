# Features Status

## User Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (In-Memory -> Prisma WIP)
- [x] Presentation Layer
- [x] Architecture Compliance: Strictly follows async/await + AppError patterns (v2 rules).
- [x] Authentication/Authorization integration: Supabase Auth + Local User Lookup.

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

## Project Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (Prisma)
- [x] Presentation Layer
- [x] Architecture Compliance

### Use Cases

- CreateProject: Create a new project in an organization.
- GetProject: Get project by ID.
- GetProjects: List all projects.
- UpdateProject: Update project details.
- DeleteProject: Delete a project.

### Ports

- ProjectRepository: Persistence access for projects.

### Endpoints

- POST /projects: Create project.
- GET /projects/:id: Get project.
- GET /projects: List projects.
- PUT /projects/:id: Update project.
- DELETE /projects/:id: Delete project.

### Errors

- PROJECT_NOT_FOUND
- PROJECT_ALREADY_EXISTS

## Tag Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (Prisma)
- [x] Presentation Layer
- [x] Architecture Compliance

### Use Cases

- CreateTag: Create a new tag in an organization.
- GetTags: List all tags for an organization.
- DeleteTag: Delete a tag.

### Ports

- TagRepository: Persistence access for tags.

### Endpoints

- POST /tags: Create tag.
- GET /tags: List tags (query param `orgId`).
- DELETE /tags/:id: Delete tag.

### Errors

- TAG_NOT_FOUND
- TAG_ALREADY_EXISTS

## Task Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (Prisma)
- [x] Presentation Layer
- [x] Architecture Compliance

### Use Cases

- CreateTask: Create a new task in a project.
- GetTask: Get task by ID.
- GetTasks: List all tasks for a project.
- UpdateTask: Update task details.
- DeleteTask: Delete a task.

### Ports

- TaskRepository: Persistence access for tasks.

### Endpoints

- POST /tasks: Create task.
- GET /tasks/:id: Get task.
- GET /tasks: List tasks (query param `projectId`).
- PUT /tasks/:id: Update task.
- DELETE /tasks/:id: Delete task.

### Errors

- TASK_NOT_FOUND

## Infrastructure

- [x] Database: Prisma Schema defined (User, Organization, Project, Task, TaskComment, Tag).
- [x] Database: Prisma Client generated.
- [x] Storage: Supabase Storage implemented.

## Shared Query Infrastructure (Sorting, Filtering, Pagination)

### Status

- [x] Domain types (`@repo/domain/query`)
- [x] Zod schema factory (`shared/query/query.schema.ts`)
- [x] Prisma query builder (`shared/query/prisma-query.builder.ts`)
- [x] Applied to all list endpoints

### Supported Query Parameters

All list (`GET /`) endpoints support:

- **Pagination**: `?page=1&limit=20` (offset-based, defaults: page=1, limit=20)
- **Sorting**: `?sort=name` (asc), `?sort=-name` (desc), `?sort=-priority,createdAt` (multi-sort)
- **Filtering**: `?status=active` (exact match), `?status=todo,in_progress` (OR/in), `?dueDate[gte]=2024-01-01` (comparison)

### Per-Feature Allowed Fields

| Feature      | Sort Fields                                            | Filter Fields                         |
| ------------ | ------------------------------------------------------ | ------------------------------------- |
| Task         | title, status, priority, dueDate, createdAt, updatedAt | status, priority, assignedToId, title |
| Project      | name, createdAt, updatedAt                             | name                                  |
| Organization | name, createdAt, updatedAt                             | name, visibility                      |
| Workspace    | name, createdAt, updatedAt                             | name                                  |
| Tag          | name                                                   | name                                  |

### Response Shape (Paginated)

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```
