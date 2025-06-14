import {AppEnv as AppEnvLit} from '../../stagetypes'
import type {AppEnv} from '../../stagetypes'

function getEnvironmentName(): string | undefined {
    return process.env.VITE_APP_ENV || (typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_APP_ENV : undefined);
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
