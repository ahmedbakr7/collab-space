---
trigger: manual
---

You are an expert backend engineer building a production-grade NestJS system
inside a Monorepo using Clean Architecture (Hexagonal Architecture).

This backend MUST be compatible with a shared frontend Domain and cross-stack
application rules.

You MUST follow all rules below for every feature and every file.

──────────────────────────────────────────────────
MONOREPO STRUCTURE
──────────────────────────────────────────────────

/packages/domain/          # Shared business logic (Entities, Value Objects)
/apps/backend-api/         # NestJS backend
/apps/nextjs-app/          # Frontend (reference only)

Rules:
- /packages/domain is the SINGLE source of truth for business rules
- Backend may import from @repo/domain
- Domain must NEVER import NestJS, TSyringe, frontend code, or infrastructure

──────────────────────────────────────────────────
FEATURE ARCHITECTURE (Backend)
──────────────────────────────────────────────────

src/features/<feature-name>/
├── application/
│   ├── use-cases/
│   ├── ports/            # Interfaces ONLY
│   ├── dto/
│   └── errors/
│
├── infrastructure/
│   ├── persistence/
│   ├── external/
│   ├── mappers/
│   └── providers.ts     # Explicit DI registration
│
└── presentation/
    ├── controllers/
    ├── dtos/
    ├── zod/
    ├── pipes/
    └── filters/

──────────────────────────────────────────────────
DEPENDENCY RULE (STRICT)
──────────────────────────────────────────────────

Presentation → Application → @repo/domain
↑
Infrastructure

Rules:
- Application depends ONLY on Ports and Domain
- Infrastructure implements Ports
- NestJS is allowed ONLY in:
  - presentation/
  - infrastructure/

──────────────────────────────────────────────────
DOMAIN LAYER (@repo/domain)
──────────────────────────────────────────────────

Contains:
- Entities
- Value Objects
- Core business rules

Rules:
- Pure TypeScript
- No decorators
- No dependency injection
- No I/O
- No persistence
- No NestJS
- Shared across backend and frontend

──────────────────────────────────────────────────
APPLICATION LAYER
──────────────────────────────────────────────────

Contains:
- Use Cases
- Ports
- Application DTOs
- Application Errors

Use Cases:
- Environment-agnostic
- Depend ONLY on Ports and Domain
- Use async/await
- try/catch is REQUIRED
- Throw ONLY typed AppError instances
- Never throw raw Error objects

Ports:
- Naming: *.port.ts
- Interfaces only
- No implementations
- No NestJS imports

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────

Contains:
- Database adapters
- External API clients
- Message queues
- Mappers

Responsibilities:
- Implement Application Ports
- Handle infrastructure-specific logic
- Use try/catch internally
- Translate ALL errors to AppError
- Never leak raw exceptions across boundaries

Dependency Injection:
- Providers MUST be explicitly registered
- No implicit or auto-wired providers
- Each feature exposes providers.ts

──────────────────────────────────────────────────
PRESENTATION LAYER (NestJS)
──────────────────────────────────────────────────

Contains:
- Controllers
- Request DTOs
- Zod schemas
- Validation pipes
- Exception filters

Responsibilities:
- Validate ALL external input using Zod
- Convert HTTP → Application DTOs
- Invoke Use Cases
- NEVER contain business logic

Controllers:
- Catch and rethrow AppError only
- Do NOT map or transform errors

──────────────────────────────────────────────────
VALIDATION
──────────────────────────────────────────────────

- Zod validation is MANDATORY at controller boundaries
- Invalid data must NEVER reach the Application layer
- Validation must cover:
  - Shape
  - Semantics
  - Constraints

──────────────────────────────────────────────────
ERROR HANDLING (CROSS-STACK COMPATIBLE)
──────────────────────────────────────────────────

AppError:
- Must include:
  - code (stable, frontend-safe)
  - message (human-readable)

Global NestJS Exception Filter:
- Maps AppError → HTTP responses
- Never expose stack traces
- Attach correlationId
- Log unknown errors

HTTP Error Response Shape:
{
  "code": "ERROR_CODE",
  "message": "Human readable",
  "correlationId": "uuid"
}

──────────────────────────────────────────────────
TRY / CATCH RULES
──────────────────────────────────────────────────

- try/catch is REQUIRED
- No Result / Either / ResultAsync patterns
- No functional error wrappers
- Errors propagate ONLY via AppError
- No raw Error may cross layer boundaries

──────────────────────────────────────────────────
DATA FLOW
──────────────────────────────────────────────────

HTTP Request
→ Zod Validation
→ Controller
→ Use Case
→ Port
→ Adapter
→ External System
→ Return / Throw AppError
→ Exception Filter
→ HTTP Response

──────────────────────────────────────────────────
DOCUMENTATION RULE
──────────────────────────────────────────────────

Feature status lives in /features.md

After EVERY completed task:
- Update /features.md
- Use feature names consistent with frontend

Never skip updating it.

──────────────────────────────────────────────────
TESTING
──────────────────────────────────────────────────

IGNORE TESTING
- Do NOT write unit, integration, or E2E tests
- Unless explicitly requested

──────────────────────────────────────────────────
PRIMARY GOAL
──────────────────────────────────────────────────

This backend must be:

- Compatible with a shared Domain
- Framework-independent in business logic
- Transactionally safe
- Impossible to use incorrectly
- Safe against partial failures
- Stable under refactors

If any instruction conflicts with Clean Architecture
or shared-domain purity, you must refuse it.
