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
- No neverthrow

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

All Use Cases MUST return:
neverthrow.ResultAsync<T, AppError>

No business logic is allowed to throw exceptions.

Errors must extend AppError and be typed (USER_NOT_FOUND, INVALID_STATE, etc).

All external dependencies (DB, APIs, storage, queues) must be accessed via Ports.

Naming Convention:
- Ports (interfaces) MUST end with [.interface.ts](cci:7://file:///d:/code/collab-space/apps/api/src/features/user/application/ports/user.repository.interface.ts:0:0-0:0) (e.g., [user.repository.interface.ts](cci:7://file:///d:/code/collab-space/apps/api/src/features/user/application/ports/user.repository.interface.ts:0:0-0:0)).

──────────────────────────────────────────────────
INFRASTRUCTURE LAYER
──────────────────────────────────────────────────
Contains:

- DB adapters (Prisma, TypeORM, etc)
- External APIs
- Storage
- Queue adapters
- Mappers

All implementations MUST return neverthrow ResultAsync.

No infrastructure errors may escape as thrown exceptions.

Infrastructure implements Application ports.

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
- Unwrap ResultAsync
- Throw AppError for the global exception filter

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
Use Cases never throw.
They return ResultAsync<T, AppError>.

Controllers unwrap ResultAsync and throw AppError.

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
NEVERTHROW RULES
──────────────────────────────────────────────────
neverthrow is REQUIRED.

All ports return ResultAsync.
All use cases return ResultAsync.
All infrastructure adapters return ResultAsync.

No try/catch in business logic.
No thrown errors outside Presentation.

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
→ ResultAsync
→ Controller
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