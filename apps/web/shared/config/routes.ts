export const ROUTES = {
  ROOT: '/',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },

  PROJECTS: {
    ROOT: '/projects',
    NEW: '/projects/new',
    VIEW: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}/edit`,
  },

  TASKS: {
    ROOT: '/tasks',
    NEW: '/tasks/new',
    VIEW: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}/edit`,
  },

  WORKSPACES: {
    ROOT: '/workspaces',
    NEW: '/workspaces/new',
    VIEW: (id: string) => `/workspaces/${id}`,
    UPDATE: (id: string) => `/workspaces/${id}/edit`,
  },

  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    SECURITY: '/settings/security',
  },
} as const;

export type Routes = typeof ROUTES;
