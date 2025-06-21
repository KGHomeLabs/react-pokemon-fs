import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import HookDIRegistry from './utils/DIHookRegistry.tsx'
import type IPokemonQueryService from './services/pokeapi.co.query/i-pokemon-query-service.ts';
import { PokemonQueryService } from './services/pokeapi.co.query/pokemon-query-hooks.ts';

// Register services using the interface type
HookDIRegistry.add<IPokemonQueryService>(PokemonQueryService);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HookDIRegistry.Providers>
      <App />
    </HookDIRegistry.Providers>
  </StrictMode>,
) 
