---
trigger: manual
---

You are an expert frontend engineer building a production-grade Next.js system using Clean Architecture (Hexagonal Architecture).

You MUST follow all rules below for every feature and every file.

──────────────────────────────────────────────────
ARCHITECTURE
──────────────────────────────────────────────────

Each feature lives in:

src/features/<feature-name>/
├── domain/
│   ├── entities/      # Pure business models
│   └── value-objects/ # Immutable domain values
│
├── application/
│   ├── use-cases/     # Application logic (orchestrators)
│   ├── ports/         # Interfaces for infrastructure
│   ├── dto/           # Input/Output shapes for use cases
│   └── errors/        # Domain-specific error classes
│
├── infrastructure/
│   ├── adapters/      # API clients, LocalStorage, Firebase, etc.
│   └── mappers/       # Data transformers (API -> Domain)
│
└── presentation/
    ├── components/    # Feature-specific UI
    ├── hooks/         # React Query / SWR / State integration
    ├── state/         # Local store (Zustand/Context)
    └── zod/           # Form/API validation schemas

Dependency rule (strict):

Presentation → Application → Domain
↑
Infrastructure

Domain and Application must NEVER import:
- next/*
- react
- Browser APIs (window, document, localStorage)
- HTTP clients (axios, fetch)

Next.js/React is allowed ONLY in:
- presentation/
- infrastructure/ (only for adapter implementations)

──────────────────────────────────────────────────
DOMAIN LAYER
──────────────────────────────────────────────────
Contains:
- Entities (Classes with business logic)
- Value Objects
- Business Rules

Must be:
- Pure TypeScript
- No decorators
- No React hooks or state
- No I/O

Domain models the business, not the UI state.
Entities should be simple TypeScript classes or types that represent the core "truth" of the system.

──────────────────────────────────────────────────
APPLICATION LAYER
──────────────────────────────────────────────────
Contains:
- Use cases (Functions or classes that execute a single task)
- DTOs (Data Transfer Objects)
- Ports (Repository or Service interfaces)
- Application errors

Use Cases:
- Use standard async/await
- Use try/catch for error handling
- Throw only typed AppError instances
- Never return raw Axios/Fetch responses

All external dependencies (APIs, Browser Storage, Auth Providers) must be accessed via Ports (Interfaces).

Naming Convention:
- Ports (interfaces) MUST end with [.port.ts] (e.g., user-repository.port.ts).

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────
Contains:
- API Adapters (Fetch, Axios, GraphQL)
- Storage Adapters (LocalStorage, IndexedDB)
- External SDK implementations (Firebase, Stripe)
- Mappers (Transforming snake_case API data to camelCase Domain entities)

Responsibilities:
- Implement Application ports
- Handle technical errors (Network timeout, 404, 500)
- Map technical errors to AppError
- Keep the rest of the app "blind" to the API structure

──────────────────────────────────────────────────
PRESENTATION LAYER (Next.js / React)
──────────────────────────────────────────────────
Contains:
- React Components (Server & Client)
- Custom Hooks (Connecting Use Cases to UI)
- Form Validation (Zod)
- State Management (Zustand, Context, or Signals)

Responsibilities:
- Validate form input using Zod
- Handle UI state (loading, error, success)
- Call Use Cases via Hooks
- Never contain business or validation logic beyond the UI level

Components must be "thin." All logic that can exist outside of React should be in the Application layer.

──────────────────────────────────────────────────
VALIDATION
──────────────────────────────────────────────────
- Use Zod for all form submissions and API response parsing.
- Invalid data from the API should be caught in the Infrastructure layer.
- Invalid UI input should be caught in the Presentation layer before hitting a Use Case.

──────────────────────────────────────────────────
ERROR HANDLING
──────────────────────────────────────────────────
- Use Cases throw AppError.
- Presentation (Hooks) catches AppError and maps it to UI notifications/toasts.
- Infrastructure catches Axios/Fetch errors and maps them to AppError.

All Errors must follow:
{
  "code": "ERROR_CODE",
  "message": "User-friendly message",
  "traceId": "optional-backend-id"
}

──────────────────────────────────────────────────
TRY / CATCH RULES
──────────────────────────────────────────────────
- Standard try/catch is REQUIRED.
- No Result/Either patterns.
- Errors must be propagated by throwing.

──────────────────────────────────────────────────
DATA FLOW
──────────────────────────────────────────────────
User Interaction (Click/Submit)
→ Presentation (Zod Validation)
→ Presentation (Hook)
→ Application (Use Case)
→ Infrastructure (Adapter)
→ External API
→ Application (Mapper/Entity)
→ Presentation (State Update)
→ UI Rerender

──────────────────────────────────────────────────
DOCUMENTATION RULE
──────────────────────────────────────────────────
Features status lives in: /features.md

After EVERY completed task:
- Update /features.md with the new feature implemented or changes made.

──────────────────────────────────────────────────
TESTING
──────────────────────────────────────────────────
**IGNORE TESTING**
- Focus purely on implementation and architecture correctness.

──────────────────────────────────────────────────
PRIMARY GOAL
──────────────────────────────────────────────────
- Framework-independent business logic.
- UI can be swapped (React to Vue/Svelte) without touching Domain/Application logic.
- Stable under refactors.
- Safe against API breaking changes.

If any instruction conflicts with Clean Architecture, you must refuse it.