import { container } from 'tsyringe';
import type IPokemonHTTPService from '../../api/pokeapi.co/i-pokemon-http-service';
import { IPokemonHTTPServiceToken } from '../../api/pokeapi.co/i-pokemon-http-service';


/**Yet another workaround for the React hooks limitation
 * 
 * PokemonServiceResolver is a singleton class that provides access to the
 * IPokemonHTTPService instance. It uses dependency injection to resolve the
 * service from the tsyringe container.
 * This is only necessary because the hooks can not be used outside of a React component,
 * so we need a way to access the service instance without using hooks directly.
 * This class ensures that the service is instantiated only once and provides a
 * global access point for the application.
 */
class PokemonServiceResolver {
  private static _instance: IPokemonHTTPService | null = null;

  public static get(): IPokemonHTTPService {
    if (!this._instance) {
      this._instance = container.resolve<IPokemonHTTPService>(IPokemonHTTPServiceToken);
    }
    return this._instance;
  }
}

export default PokemonServiceResolver;