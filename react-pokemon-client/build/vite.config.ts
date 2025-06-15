// used by vite to bundle the app, relies on tsconfig having ran first
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import { GitBranch, AppEnv, ViteModes } from '../config/stagetypes';
import type {ViteMode} from '../config/stagetypes';
// Used for logging, set via define
const envVariable = 'import.meta.env.VITE_APP_ENV';

const resolveAppEnv = (mode: ViteMode): AppEnv => {
  console.info('Resolving Environment . . .'); // <-- on hosting environment this will show on the build server log
  console.warn(`Mode is set to: ${mode}`);

  switch (mode) {
    case ViteModes.DevEnv: {
      console.info(`setting ${envVariable} to ${AppEnv.Development}`);
      return AppEnv.Development;
    }
    case ViteModes.DevEnvBuild: {
      console.info(`setting ${envVariable} to ${AppEnv.Development}`);
      console.info('Using preview build, no hot reloading, tsc is involved');
      return AppEnv.Development;
    }
    case ViteModes.PrevEnv: {
      console.info(`setting ${envVariable} to ${AppEnv.Preview}`);
      return AppEnv.Preview;
    }
    case ViteModes.PrevEnvBuild: {
      console.info(`setting ${envVariable} to ${AppEnv.Preview}`);
      console.info('Using preview build, no hot reloading, tsc is involved');
      return AppEnv.Preview;
    }
    case ViteModes.ProdEnv: {
      console.info(`setting ${envVariable} to ${AppEnv.Production}`);
      return AppEnv.Production;
    }
    case ViteModes.ProdEnvBuild: {
      console.info(`setting ${envVariable} to ${AppEnv.Production}`);
      console.info('Using preview build, no hot reloading, tsc is involved');
      return AppEnv.Production;
    }
    case ViteModes.Development: {
      // here I would like to do something special when project is launched
      // using `npm run dev` or `yarn dev`
      // ensuring that the environment switches also work when not on
      // hosting environments like Vercel or Netlify, Cloudflare, etc.
      // this will be tied to the branch that yarn dev is ran from
      try {
        console.info('Fetching GIT branch . . .');
        const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        switch (branch) {
          case GitBranch.Production:
            return AppEnv.Production;
          case GitBranch.Preview:
            return AppEnv.Preview;
          case GitBranch.Development:
            return AppEnv.Development;
          default:
            return AppEnv.Development;
        }
      } catch (error) {
        console.error('Error mapping Git repo branch');
        return AppEnv.Development;
      }
    }
    case ViteModes.Production:
    case ViteModes.Preview: {
      // in case we are not in vite development mode...
      // TODO: think about if defaulting to Dev is actually smart,
      //       because if it fails on production prod might be a dev version then
      const env = process.env.VITE_APP_ENV as AppEnv;
      console.error(`${envVariable} is set to ${env}`);
      if (env === AppEnv.Production || env === AppEnv.Preview || env === AppEnv.Development) {
        console.error(`Internal stage is being set to ${env}`);
        return env;
      } else {
        const defaultEnv = mode === ViteModes.Production ? AppEnv.Production : AppEnv.Development;
        console.error(
          `${envVariable} not set or doesnt match an internal available stage, internal stage defaulting to ${defaultEnv}`
        ); // <-- on hosting environment this will show on the build server log
        return defaultEnv; // Safer default for non-dev builds
      }
    }
    default: {
      console.warn(`Unknown mode ${mode}, defaulting to Development`);
      return AppEnv.Development;
    }
  }
};

// https://vite.dev/config/
export default defineConfig((options: { mode: string }) => {
  const mode = options.mode as ViteMode; // Cast mode to ViteMode for type safety
  const currentAppEnv = resolveAppEnv(mode);
  console.info(`Current environment: ${currentAppEnv}`)
  return {
    plugins: [react()],
    define: {
      [envVariable]: JSON.stringify(currentAppEnv), // Use envVariable as the key
    },
    build: {
      sourcemap: true,
    },
    tsconfig: '../config/tsconfig.json', // Relative to vite.config.ts
  };
});