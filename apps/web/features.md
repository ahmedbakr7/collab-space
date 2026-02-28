# Features Status

## Overview

Status of features in `apps/web/features` following Clean Architecture.

## Features

### `auth`

- **Location**: `src/features/auth`
- **Layers**:
  - `presentation`: Components and Pages (Refactored, using `useLogin`, `useSignup`, and `useLogout` hooks)
  - `application`: Use Cases (`LoginUseCase`, `SignupUseCase`, `LogoutUseCase`) and Ports (`AuthPort`) added
  - `infrastructure`: Adapters (`SupabaseAuthAdapter`, `MockAuthAdapter`) and DI setup complete (Client-side Supabase integrated)

### `dashboard`

- **Location**: `src/features/dashboard`
- **Layers**:
  - `presentation`: Components and Pages (Refactored)

### `organization`

- **Location**: `src/features/organization`
- **Layers**:
  - `presentation`: Components, Hooks (`useOrganizations`)
  - `application`: Use Cases (`GetOrganizationsUseCase`, `CreateOrganizationUseCase`, `JoinOrganizationUseCase`) and Ports (`OrganizationRepositoryPort`)
  - `infrastructure`: Adapters (`OrganizationRepositoryAdapter`) registered in both Server and Client Containers

### `project`

- **Location**: `src/features/project`
- **Layers**:
  - `presentation`: Components (`ProjectsView`, `ProjectsList`, `ProjectCard`, `CreateProjectForm`) and Hooks (`useProjects`, `useCreateProject`) refactored to use DI. Uses `ProjectUI` model and `ProjectUIMapper`.
  - `application`: Use Cases (`GetProjectsByWorkspaceUseCase`, `CreateProjectUseCase`) and Ports (`ProjectRepositoryPort`) DI-ready. Zod schemas and DTOs moved to `@repo/shared-schemas` and `@repo/domain` packages.
  - `infrastructure`: Adapters (`ProjectRepositoryAdapter`) registered in DI. Repository and Entities updated to support `status`. Added `createProject` to adapter.

### `shared`

- **Location**: `src/features/shared`
- **Layers**:
  - `presentation`: Utilities and reusable components (Refactored)

### `tasks`

- **Location**: `src/features/tasks` (and `src/features/task`)
- **Layers**:
  - `presentation`: Hooks (`useProjectTasks`, `useCreateTask`) and Components (`CreateTaskForm`) refactored to use DI
  - `application`: Use Cases (`GetTasksUseCase`, `CreateTaskUseCase`) and Ports DI-ready. Zod schemas and DTOs moved to `@repo/shared-schemas` and `@repo/domain` packages.
  - `infrastructure`: Adapters (`InMemoryTaskRepository`, `TaskRepositoryAdapter`) registered in DI. Added `createTask` to adapter.

### `workspace`

- **Location**: `src/features/workspace`
- **Layers**:
  - `presentation`: Components (`CreateWorkspaceForm`, Refactored, Sidebar connected) and Hooks (`useCreateWorkspace`).
  - `application`: Use Cases (`GetAllWorkspacesUseCase`, `CreateWorkspaceUseCase`) fetches by orgId from route params
  - `infrastructure`: Adapters (`WorkspaceRepositoryAdapter`) registered in Server Container

## Next Steps

- Implement `application` and `infrastructure` layers for logic-heavy features (`auth`, `project`).
- Move remaining business logic from `presentation` (ui) to `application` (use cases).
