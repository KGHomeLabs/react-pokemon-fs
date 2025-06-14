import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { AppEnv } from './src/utils/env'

export const GitBranch = {
  Development: 'dev',
  Preview: 'prev',
  Production: 'master',
} as const;

export type GitBranch = (typeof GitBranch)[keyof typeof GitBranch];

const resolveAppEnv = (mode:string): AppEnv => {
  console.info('Resolving Environment . . .');  //<-- on hosting environment this will show on the buildserver log
  if (mode === 'development') {
    //here I would like to do something special when project is launched
    //using `npm run dev` or `yarn dev`
    //ensuring that the environment switches also work when not on 
    //hosting environments like Vercel or Netlify, cloudflare etc.
    //this will be tied to the branch that yarn dev is ran from
    try {      
      console.info('Fetching GIT branch . . .'); 
      const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();     
      switch (branch) {
        case GitBranch.Production: return AppEnv.Production;
        case GitBranch.Preview:return AppEnv.Preview;
        default:  return AppEnv.Development;
      }
    } catch (error) {
      //defaults to development  
      console.error("Error mapping Git repo branch");
      return AppEnv.Development;
    }
  } else {
    //in case we are not in vite development mode...
    //TODO: think about if defaulting to Dev is actually smart,
    //      because if it fails on production prod might be a dev version then
      const env = process.env.VITE_APP_ENV as AppEnv;
      console.error(`VITE_APP_ENV is set to ${env}`);
      if (env === AppEnv.Production || env === AppEnv.Preview) {
        return env;
      }
      const defaultEnv=AppEnv.Development;
      console.error(`VITE_APP_ENV not set or invalid, defaulting to ${defaultEnv}`); //<-- on hosting environment this will show on the buildserver log
      return defaultEnv; // Safer default for non-dev builds
  }
}



// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const currentAppEnv = resolveAppEnv(mode); 
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_APP_ENV':JSON.stringify(currentAppEnv)
    },
    build: {
      sourcemap: true
    }
  }
})
