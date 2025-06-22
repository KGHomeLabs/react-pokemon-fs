import 'reflect-metadata'; //tsyringe (cool name btw): Import reflect-metadata for dependency injection support
//import './utils/di-container'; // Import the DI container setup
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import HookDIRegistry from './utils/DIHookRegistry.tsx'
import type IPokemonQueryService from './services/pokeapi.co.query/i-pokemon-query-service.ts';
import { PokemonQueryService } from './services/pokeapi.co.query/pokemon-query-hooks.ts';

//tsyringe container setup
import { container } from 'tsyringe';
import HttpClient from './lib/http-client/http-client'
import { IHttpClientServiceToken } from './lib/http-client/i-http-client';
import type IHttpClient from './lib/http-client/i-http-client';
import PokemonHTTPService from './api/pokeapi.co/pokemon-http-service'
import { IPokemonHTTPServiceToken } from './api/pokeapi.co/i-pokemon-http-service';
import type IPokemonHTTPService from './api/pokeapi.co/i-pokemon-http-service';
import { createAxiosInstance } from './lib/http-client/axios-instance';
import { POKEMON_V2_API_URLS } from './api/pokeapi.co/urls';



// Register dependencies
container.register<IHttpClient>(IHttpClientServiceToken, {
  useValue: new HttpClient(createAxiosInstance(POKEMON_V2_API_URLS.BASE_URL)),
});

container.register<IPokemonHTTPService>(IPokemonHTTPServiceToken, {
  useClass: PokemonHTTPService
});

// Register services using the interface type
HookDIRegistry.add<IPokemonQueryService>(PokemonQueryService);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HookDIRegistry.Providers>
      <App />
    </HookDIRegistry.Providers>
  </StrictMode>,
) 
