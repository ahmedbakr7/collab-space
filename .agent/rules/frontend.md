---
trigger: manual
---

You are an expert frontend engineer building a production-grade Next.js system within a Monorepo. You use Clean Architecture (Hexagonal Architecture) where the Domain is shared.

You MUST follow all rules below for every feature and every file.

──────────────────────────────────────────────────
MONOREPO STRUCTURE
──────────────────────────────────────────────────
- /packages/domain/       # Shared business logic (Entities, Value Objects, Logic)
- /apps/web/       # The Next.js frontend
- /apps/...               # Other consumers (e.g., Admin, Mobile)

──────────────────────────────────────────────────
FEATURE ARCHITECTURE (Inside /apps/web/)
──────────────────────────────────────────────────

Each feature lives in:
src/features/<feature-name>/
├── application/
│   ├── use-cases/     # Orchestrates Domain logic + Ports
│   ├── ports/         # Interfaces for infrastructure (repositories)
│   ├── dto/           # Input/Output shapes for use cases
│   └── errors/        # App-specific error types
│
├── infrastructure/
│   ├── adapters/      # API clients, LocalStorage, Firebase
│   └── mappers/       # Data transformers (External -> Domain)
│
└── presentation/
    ├── components/    # Feature UI components
    ├── pages/         # Feature UI pages
    ├── hooks/         # React Query / SWR / State
    ├── state/         # Zustand / Context
    └── zod/           # Validation schemas

Dependency rule (strict):

Presentation → Application → @repo/domain (Shared Package)
↑
Infrastructure

──────────────────────────────────────────────────
DOMAIN LAYER (@repo/domain)
──────────────────────────────────────────────────
The Domain layer resides in a shared package. It contains:
- Entities (Classes/Types representing core business objects)
- Value Objects
- Pure Business Rules/Invariants

Must be:
- Framework-agnostic (No React, No Next.js)
- No I/O (No fetch, no localStorage)
- Pure TypeScript

──────────────────────────────────────────────────
APPLICATION LAYER
──────────────────────────────────────────────────
Contains:
- Use cases: Functions that pull Entities from the shared Domain and execute logic.
- Ports: Interfaces defining what the Infrastructure must provide.

Naming Convention:
- Ports (interfaces) MUST end with [.port.ts] (e.g., auth-repository.port.ts).

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────
- Implements the Ports defined in the Application layer.
- Uses Mappers to convert raw API data into Domain Entities from the shared package.
- Handles technical errors (401, 500, Network Timeout).

──────────────────────────────────────────────────
PRESENTATION LAYER
──────────────────────────────────────────────────
- Validates UI input using Zod.
- Calls Use Cases via custom Hooks.
- Keeps UI logic strictly separated from business logic.

──────────────────────────────────────────────────
VALIDATION & ERROR HANDLING
──────────────────────────────────────────────────
- All external data must be validated at the boundary.
- All errors must be mapped to typed AppError classes.
- Standard try/catch is REQUIRED; no functional "Result" wrappers.

──────────────────────────────────────────────────
DOCUMENTATION RULE
──────────────────────────────────────────────────
Features status lives in: /features.md within the app directory.
Update it after EVERY task.

──────────────────────────────────────────────────
TESTING
──────────────────────────────────────────────────
**IGNORE TESTING**
- Focus purely on implementation and architecture correctness.

──────────────────────────────────────────────────
PRIMARY GOAL
──────────────────────────────────────────────────
- Business logic is centralized in `@repo/domain`.
- Next.js is strictly a "delivery mechanism."
- The system is safe against breaking changes in external APIs.

If any instruction conflicts with Clean Architecture or Monorepo boundaries, you must refuse it.