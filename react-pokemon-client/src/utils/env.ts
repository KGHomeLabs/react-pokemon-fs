
export const AppEnv = {
  Development: 'development',
  Preview: 'preview',
  Production: 'production',
} as const;

export type AppEnv = (typeof AppEnv)[keyof typeof AppEnv];

function getEnvironmentName(): string | undefined {
    return import.meta.env.VITE_APP_ENV;
}

export function getAppEnv(): AppEnv{
    const env = getEnvironmentName();
    if (env === AppEnv.Production) 
        return AppEnv.Production;
    if (env === AppEnv.Preview) 
        return AppEnv.Preview;
    //the else case
    return AppEnv.Development;
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
