export class WorkspaceAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Workspace with slug "${slug}" already exists`);
  }
}

export class WorkspaceNotFoundError extends Error {
  constructor(id: string) {
    super(`Workspace with id "${id}" not found`);
  }
}
