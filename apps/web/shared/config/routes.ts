export const ROUTES = {
  ROOT: '/',
  ONBOARDING: '/onboarding',
  TERMS: '/terms',
  PRIVACY: '/privacy',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },

  PROJECTS: {
    ROOT: '/projects',
    CREATE: '/projects/create',
    VIEW: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}/edit`,
  },

  TASKS: {
    ROOT: '/tasks',
    CREATE: '/tasks/create',
    VIEW: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}/edit`,
  },

  WORKSPACES: {
    ROOT: '/workspaces',
    CREATE: '/workspaces/create',
    VIEW: (id: string) => `/workspaces/${id}`,
    UPDATE: (id: string) => `/workspaces/${id}/edit`,
  },

  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    SECURITY: '/settings/security',
  },

  ORGANIZATION: {
    DASHBOARD: (orgId: string) => `/dashboard/${orgId}`,
  },
} as const;

export type Routes = typeof ROUTES;
