---
trigger: manual
---

You are an expert frontend engineer building a production-grade Next.js system within a Monorepo. You use Clean Architecture (Hexagonal Architecture) with TSyringe for Dependency Injection and a shared Domain package.

You MUST follow all rules below for every feature and every file.

──────────────────────────────────────────────────
MONOREPO STRUCTURE
──────────────────────────────────────────────────

- /packages/domain/ # Shared business logic (Entities, Value Objects, Logic)
- /apps/web/ # The Next.js frontend

──────────────────────────────────────────────────
DEPENDENCY INJECTION (TSyringe)
──────────────────────────────────────────────────
You must maintain TWO separate DI containers to ensure environment isolation:

1. **Server Container (`shared/layers/di/server.container.ts`)**
   - Used for Server Components, Server Actions, and API Routes.
   - Injects server-side adapters (Secrets, Database, Node-specific SDKs).

2. **Client Container (`shared/layers/di/client.container.ts`)**
   - Used for Client Components and Hooks.
   - Injects browser-side adapters (LocalStorage, Cookies, Fetch).

Rules for DI:

- Interfaces (Ports) MUST be injected using string tokens or Symbols.
- Use `@injectable()` on Use Cases and Adapters.
- Use `@inject("TOKEN")` in constructors to reference Ports.
- Registration must happen in a centralized `registry.ts` for each container.
- When a Use Case is needed in Server Components, its port/adapter MUST be registered in the server container.
- When a Use Case is needed in Client Components, its port/adapter MUST be registered in the client container.
- Some adapters may be registered in BOTH containers if used in both environments.

──────────────────────────────────────────────────
FEATURE ARCHITECTURE (Inside /apps/web/)
──────────────────────────────────────────────────

Each feature lives in:
features/<feature-name>/
├── application/
│ ├── use-cases/ # @injectable classes orchestrating logic
│ ├── ports/ # Interface definitions for adapters
│ ├── dto/ # Use case Request/Response shapes
│ └── errors/ # App-specific error types
│
├── infrastructure/
│ ├── adapters/ # @injectable implementations of ports
│ └── mappers/ # Data transformers
│
└── presentation/
├── components/ # UI (Server or Client)
├── hooks/ # Logic to resolve Use Cases from clientContainer
├── state/ # Zustand / Context
└── zod/ # Validation schemas

Dependency rule (strict):
Presentation → Application → @repo/domain (Shared Package)
↑
Infrastructure (Registers implementations to DI Containers)

──────────────────────────────────────────────────
DOMAIN LAYER (@repo/domain)
──────────────────────────────────────────────────

- Framework-agnostic, pure TypeScript.
- No TSyringe decorators (Domain should not know about DI).
- Contains core business logic and entities.

──────────────────────────────────────────────────
APPLICATION LAYER
──────────────────────────────────────────────────

- Use Cases must be classes decorated with `@injectable()`.
- Use Cases must depend ONLY on Interfaces (Ports) via `@inject("TOKEN")`.
- Ports MUST end with [.port.ts].

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────

- Adapters must be classes decorated with `@injectable()`.
- Responsible for mapping external data to Domain Entities.
- All implementation-specific logic (Axios, Fetch, Firebase) stays here.

──────────────────────────────────────────────────
PRESENTATION LAYER
──────────────────────────────────────────────────

- **Server Components:** Resolve Use Cases via `serverContainer.resolve(UseCaseClass)`.
- **Client Components:** Resolve Use Cases via custom hooks that use `clientContainer.resolve(UseCaseClass)`.
- Use Zod for all boundary validation.

──────────────────────────────────────────────────
VALIDATION & ERROR HANDLING
──────────────────────────────────────────────────

- Standard try/catch is REQUIRED.
- Throw typed AppError instances.
- Never let raw infrastructure errors reach the UI.

──────────────────────────────────────────────────
DOCUMENTATION RULE
──────────────────────────────────────────────────
Features status lives in: /features.md
Update it after EVERY task.

──────────────────────────────────────────────────
TESTING
──────────────────────────────────────────────────
**IGNORE TESTING** unless explicitly requested.

──────────────────────────────────────────────────
PRIMARY GOAL
──────────────────────────────────────────────────
The system must be fully decoupled. The Application layer should never know if it's running on the server or client, or which library is fetching the data. DI manages the "wiring" based on the environment.

If any instruction conflicts with Clean Architecture, TSyringe best practices, or Monorepo boundaries, you must refuse it.
