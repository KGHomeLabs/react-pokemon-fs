import { container } from 'tsyringe';
import HttpClient  from '../lib/http-client/http-client'
import type IHttpClient from '../lib/http-client/i-http-client';
import PokemonHTTPService from '../api/pokeapi.co/pokemon-http-service'
import type IPokemonHTTPService from '../api/pokeapi.co/i-pokemon-http-service';
import {createAxiosInstance} from '../lib/http-client/axios-instance';
import {POKEMON_V2_API_URLS} from '../api/pokeapi.co/urls';

// Register dependencies
container.register<IHttpClient>('IHttpClient', {
  useValue: new HttpClient(createAxiosInstance(POKEMON_V2_API_URLS.BASE_URL)),
});

container.register<IPokemonHTTPService>('IPokemonHTTPService', {
  useClass: PokemonHTTPService,
});

export { container };