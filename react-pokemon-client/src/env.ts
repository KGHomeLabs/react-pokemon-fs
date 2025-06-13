
export const AppEnv = {
  Development: 'development',
  Preview: 'preview',
  Production: 'production',
} as const;

export type AppEnv = (typeof AppEnv)[keyof typeof AppEnv];


export function getAppEnv(): AppEnv{
    const env = import.meta.env.VITE_APP_ENV as AppEnv | undefined;
    return env ?? AppEnv.Development;
}

export function isDev() {
    return getAppEnv() === AppEnv.Development
}

export function isPreview(){
    return getAppEnv() === AppEnv.Preview;
}

export function isProd() {
    return getAppEnv() === AppEnv.Production;
}
