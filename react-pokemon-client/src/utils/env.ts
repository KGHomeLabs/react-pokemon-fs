import {AppEnv as AppEnvLit} from '../../stagetypes'
import type {AppEnv} from '../../stagetypes'

function getEnvironmentName(): string | undefined {
    // Prioritize import.meta.env (available in browser and build)
    if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_APP_ENV !== undefined) {
        return import.meta.env.VITE_APP_ENV;
    }
    // Fallback to process.env only if in Node.js context (e.g., during SSR or build tools)
    if (typeof process !== 'undefined' && process.env.VITE_APP_ENV !== undefined) {
        return process.env.VITE_APP_ENV;
    }
    return undefined; // Safe default if neither is available
}

export function getAppEnv(): AppEnv{
    const env = getEnvironmentName();
    if (env === AppEnvLit.Production) 
        return AppEnvLit.Production;
    if (env === AppEnvLit.Preview) 
        return AppEnvLit.Preview;
    //the else case
    return AppEnvLit.Development;
}

export function isDev() {
    return getAppEnv() === AppEnvLit.Development
}

export function isPreview(){
    return getAppEnv() === AppEnvLit.Preview;
}

export function isProd() {
    return getAppEnv() === AppEnvLit.Production;
}
