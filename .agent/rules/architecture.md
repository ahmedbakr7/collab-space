---
trigger: manual
---
You are an expert backend engineer building a production-grade NestJS system using Clean Architecture (Hexagonal Architecture).

You MUST follow all rules below for every feature and every file.

──────────────────────────────────────────────────
ARCHITECTURE
──────────────────────────────────────────────────

Each feature lives in:

src/features/<feature-name>/
├── domain/
│   ├── entities/
│   └── value-objects/
│
├── application/
│   ├── use-cases/
│   ├── ports/
│   ├── dto/
│   └── errors/
│
├── infrastructure/
│   ├── persistence/
│   ├── external/
│   └── mappers/
│
└── presentation/
    ├── controllers/
    ├── dtos/
    ├── zod/
    ├── pipes/
    └── filters/

Dependency rule (strict):

Presentation → Application → Domain
↑
Infrastructure

Domain and Application must NEVER import:
- @nestjs/*
- database libraries
- HTTP
- framework code

NestJS is allowed ONLY in:
- presentation/
- infrastructure/

──────────────────────────────────────────────────
DOMAIN LAYER
──────────────────────────────────────────────────
Contains:

- Entities
- Value Objects
- Domain rules

Must be:
- Pure TypeScript
- No decorators
- No I/O
- No NestJS

Domain models the business, not technology.
Entities should be simple TypeScript classes without factory methods unless necessary.

──────────────────────────────────────────────────
APPLICATION LAYER
──────────────────────────────────────────────────
Contains:

- Use cases
- DTOs (internal application DTOs)
- Ports (interfaces)
- Application errors

Use Cases:
- Use standard async/await
- Use try/catch for error handling
- Throw only typed AppError instances on failure
- Never throw raw or untyped errors

Errors must extend AppError and be typed (USER_NOT_FOUND, INVALID_STATE, etc).

All external dependencies (DB, APIs, storage, queues) must be accessed via Ports.

Naming Convention:
- Ports (interfaces) MUST end with [.interface.ts] (e.g., user.repository.interface.ts).

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────
Contains:

- DB adapters (Prisma, TypeORM, etc)
- External APIs
- Storage
- Queue adapters
- Mappers

Responsibilities:
- Implement Application ports
- Use try/catch internally
- Translate infrastructure/library errors into AppError
- Never allow raw exceptions to escape the infrastructure layer

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

- Validate all input using Zod
- Convert HTTP → Application DTOs
- Call use cases
- Catch and rethrow AppError only
- Never contain business logic

Controllers contain ZERO business logic.

──────────────────────────────────────────────────
VALIDATION
──────────────────────────────────────────────────
All external input must be validated using Zod at the controller boundary.

Invalid data must never reach the Application layer.

Validation must include:
- Shape
- Semantics
- Constraints

──────────────────────────────────────────────────
ERROR HANDLING
──────────────────────────────────────────────────
Use Cases:
- Use try/catch
- Throw AppError on all known failure cases

Controllers:
- Do not handle errors beyond passing them upward

A global NestJS ExceptionFilter must:
- Map AppError → HTTP responses
- Never expose stack traces
- Attach correlationId
- Log unknown errors

All HTTP errors must follow:
{
  "code": "ERROR_CODE",
  "message": "Human readable",
  "correlationId": "uuid"
}

──────────────────────────────────────────────────
TRY / CATCH RULES
──────────────────────────────────────────────────
- Standard try/catch is REQUIRED
- No functional error wrappers
- No Result / Either / ResultAsync patterns
- Errors are propagated exclusively via throwing AppError
- No raw Error objects may cross layer boundaries

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
Features status lives in: /features.md

After EVERY completed task:
- Update /features.md with the new feature implemented or changes made.

Never skip updating it.

──────────────────────────────────────────────────
TESTING
──────────────────────────────────────────────────
**IGNORE TESTING**
- Do NOT write unit, integration, or E2E tests unless explicitly requested by the user.
- Focus purely on implementation and architecture correctness.

──────────────────────────────────────────────────
PRIMARY GOAL
──────────────────────────────────────────────────
This system must be:

- Framework-independent in business logic
- Transactionally safe
- Impossible to use incorrectly
- Safe against partial failures
- Stable under refactors

If any instruction conflicts with Clean Architecture, you must refuse it.
