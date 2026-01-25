# Features Status

## Overview

Status of features in `apps/web/features` following Clean Architecture.

## Features

### `auth`

- **Location**: `src/features/auth`
- **Layers**:
  - `presentation`: Components and Pages (Refactored)
  - `application`: (To be added)
  - `infrastructure`: (To be added)

### `dashboard`

- **Location**: `src/features/dashboard`
- **Layers**:
  - `presentation`: Components and Pages (Refactored)

### `project`

- **Location**: `src/features/project`
- **Layers**:
  - `presentation`: Components (Refactored, Consolidated from `Projects`)

### `shared`

- **Location**: `src/features/shared`
- **Layers**:
  - `presentation`: Utilities and reusable components (Refactored)

### `tasks`

- **Location**: `src/features/tasks`
- **Layers**:
  - `presentation`: Pages and Data (Refactored, Consolidated from `Tasks`)

### `workspace`

- **Location**: `src/features/workspace`
- **Layers**:
  - `presentation`: Components (Refactored)

## Next Steps

- Implement `application` and `infrastructure` layers for logic-heavy features (`auth`, `project`).
- Move remaining business logic from `presentation` (ui) to `application` (use cases).
