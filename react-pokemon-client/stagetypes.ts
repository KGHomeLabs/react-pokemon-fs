

export const GitBranch = {
  Development: 'dev',
  Preview: 'prev',
  Production: 'master',
} as const;
//type to use for code completion for available git branches for this project
export type GitBranch = (typeof GitBranch)[keyof typeof GitBranch];

export const AppEnv = {
  Development: 'development',
  Preview: 'preview',
  Production: 'production',
} as const;
//type to use for code completion for available environments for this project
export type AppEnv = (typeof AppEnv)[keyof typeof AppEnv];
