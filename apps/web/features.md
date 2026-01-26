# Features Status

## Overview

Status of features in `apps/web/features` following Clean Architecture.

## Features

### `auth`

- **Location**: `src/features/auth`
- **Layers**:
  - `presentation`: Components and Pages (Refactored, using `useLogin` and `useSignup` hooks)
  - `application`: Use Cases (`LoginUseCase`, `SignupUseCase`) and Ports (`AuthPort`) added
  - `infrastructure`: Adapters (`SupabaseAuthAdapter`, `MockAuthAdapter`) and DI setup complete (Client-side Supabase integrated)

### `dashboard`

- **Location**: `src/features/dashboard`
- **Layers**:
  - `presentation`: Components and Pages (Refactored)

### `project`

- **Location**: `src/features/project`
- **Layers**:
  - `presentation`: Components and Hooks (`useProjects`) refactored to use DI
  - `application`: Use Cases (`GetProjectsByWorkspaceUseCase`) and Ports (`ProjectRepositoryPort`) DI-ready
  - `infrastructure`: Adapters (`InMemoryProjectRepository`) registered in DI

### `shared`

- **Location**: `src/features/shared`
- **Layers**:
  - `presentation`: Utilities and reusable components (Refactored)

### `tasks`

- **Location**: `src/features/tasks` (and `src/features/task`)
- **Layers**:
  - `presentation`: Hooks (`useProjectTasks`) refactored to use DI
  - `application`: Use Cases (`GetTasksUseCase`) DI-ready
  - `infrastructure`: Adapters (`InMemoryTaskRepository`) registered in DI

### `workspace`

- **Location**: `src/features/workspace`
- **Layers**:
  - `presentation`: Components (Refactored)

## Next Steps

- Implement `application` and `infrastructure` layers for logic-heavy features (`auth`, `project`).
- Move remaining business logic from `presentation` (ui) to `application` (use cases).
