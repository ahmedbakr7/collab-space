# Features Status

## User Feature

### Status

- [x] Domain Layer
- [x] Application Layer
- [x] Infrastructure Layer (In-Memory)
- [x] Presentation Layer

### Use Cases

- CreateUser (Register): Allows a new user to sign up.
- GetUser: Retrieves user details by ID.
- GetUsers: Retrieves all users.

### Ports

- UserRepository: Persistence access for users.

### Endpoints

- POST /users: Create a user.
- GET /users/:id: Get a user.
- GET /users: Get all users.

### Errors

- USER_ALREADY_EXISTS
- USER_NOT_FOUND
- INVALID_USER_DATA

### Missing

- Real database persistence (currently using In-Memory adapter).
- Authentication/Authorization integration.
