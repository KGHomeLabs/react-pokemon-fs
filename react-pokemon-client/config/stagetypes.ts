

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

export const ViteModes = {
  DevEnv: 'devEnv',
  DevEnvBuild: 'devEnvBuild',
  PrevEnv: 'prevEnv',
  PrevEnvBuild: 'prevEnvBuild',
  ProdEnv: 'prodEnv',
  ProdEnvBuild: 'prodEnvBuild',
  Development: 'development',
  Production: 'production',
  Preview: 'preview',
} as const;
// Type to use for code completion for available Vite modes for this project
export type ViteMode = (typeof ViteModes)[keyof typeof ViteModes];
