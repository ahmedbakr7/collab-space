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

  DASHBOARD: {
    ROOT: '/dashboard',
    HOME: (dashboardId: string) => `/dashboard/${dashboardId}`,
    PROJECTS: {
      ROOT: (dashboardId: string) => `/dashboard/${dashboardId}/projects`,
      CREATE: (dashboardId: string) =>
        `/dashboard/${dashboardId}/projects/create`,
      VIEW: (dashboardId: string, projectId: string) =>
        `/dashboard/${dashboardId}/projects/${projectId}`,
      UPDATE: (dashboardId: string, projectId: string) =>
        `/dashboard/${dashboardId}/projects/${projectId}/edit`,
    },
    TASKS: {
      ROOT: (dashboardId: string) => `/dashboard/${dashboardId}/tasks`,
      CREATE: (dashboardId: string) => `/dashboard/${dashboardId}/tasks/create`,
      VIEW: (dashboardId: string, taskId: string) =>
        `/dashboard/${dashboardId}/tasks/${taskId}`,
      UPDATE: (dashboardId: string, taskId: string) =>
        `/dashboard/${dashboardId}/tasks/${taskId}/edit`,
    },
    WORKSPACES: {
      ROOT: (dashboardId: string) => `/dashboard/${dashboardId}/workspaces`,
      CREATE: (dashboardId: string) =>
        `/dashboard/${dashboardId}/workspaces/create`,
      VIEW: (dashboardId: string, workspaceId: string) =>
        `/dashboard/${dashboardId}/workspaces/${workspaceId}`,
      UPDATE: (dashboardId: string, workspaceId: string) =>
        `/dashboard/${dashboardId}/workspaces/${workspaceId}/edit`,
    },
    SETTINGS: {
      ROOT: (dashboardId: string) => `/dashboard/${dashboardId}/settings`,
      PROFILE: (dashboardId: string) =>
        `/dashboard/${dashboardId}/settings/profile`,
      SECURITY: (dashboardId: string) =>
        `/dashboard/${dashboardId}/settings/security`,
    },
  },
} as const;

export type Routes = typeof ROUTES;
