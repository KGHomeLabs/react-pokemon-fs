//tsyringe container setup
import { container } from 'tsyringe';
import HttpClient from '../lib/http-client/http-client'
import { IHttpClientServiceToken } from '../lib/http-client/i-http-client';
import type {IHttpClientService} from '../lib/http-client/i-http-client';
import PokemonHTTPService from '../api/pokeapi.co/pokemon-http-service'
import { IPokemonHTTPServiceToken } from '../api/pokeapi.co/i-pokemon-http-service';
import type IPokemonHTTPService from '../api/pokeapi.co/i-pokemon-http-service';
import type ILogger from '../utils/logger/i-logger';
import { ILoggerToken } from '../utils/logger/i-logger';
import { LoggerService } from '../utils/logger/logger_service';

// Register dependencies
// Transient means: new instance every time you resolve it
container.register<IHttpClientService>(IHttpClientServiceToken, {useClass: HttpClient});
container.register<IPokemonHTTPService>(IPokemonHTTPServiceToken, {useClass: PokemonHTTPService});
container.register<ILogger>(ILoggerToken, { useClass: LoggerService });

export { container };