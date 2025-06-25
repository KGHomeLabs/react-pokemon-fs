import { injectable, inject} from 'tsyringe';
import { POKEMON_V2_API_URLS } from './urls';
import type {IHttpClientService} from '../../lib/http-client/i-http-client';
import { IHttpClientServiceToken } from '../../lib/http-client/i-http-client';
import type IPokemonHTTPService from './i-pokemon-http-service';
import type { DTOResourceList, DTOPokemon, DTONamedResource, DTOPokemonSpecies, DTOEvolutionChain } from './data-pokemon-api';

@injectable()
export default class PokemonHTTPService implements IPokemonHTTPService {
  private httpClient: IHttpClientService;

  constructor(@inject(IHttpClientServiceToken) httpClient: IHttpClientService) {
    httpClient.setBaseUrl(POKEMON_V2_API_URLS.BASE_URL);
    this.httpClient = httpClient;
  }

  getPokemonList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getPokemonByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTOPokemon>(POKEMON_V2_API_URLS.POKEMON(idOrName), config);
  }

  getPokemonSpeciesList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_SPECIES_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getPokemonSpeciesByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTOPokemonSpecies>(
      POKEMON_V2_API_URLS.POKEMON_SPECIES(idOrName),
      config
    );
  }

  getAbilityList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.ABILITY_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getAbilityByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ABILITY(idOrName),
      config
    );
  }

  getTypeList(config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(POKEMON_V2_API_URLS.TYPE_LIST, config);
  }

  getTypeByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.TYPE(idOrName), config);
  }

  getMoveList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.MOVE_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getMoveByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.MOVE(idOrName), config);
  }

  getMoveCategoryByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.MOVE_CATEGORY(idOrName),
      config
    );
  }

  getMoveDamageClassByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.MOVE_DAMAGE_CLASS(idOrName),
      config
    );
  }

  getItemList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.ITEM_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getItemByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.ITEM(idOrName), config);
  }

  getItemCategoryByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ITEM_CATEGORY(idOrName),
      config
    );
  }

  getItemPocketByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ITEM_POCKET(idOrName),
      config
    );
  }

  getLocationList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.LOCATION_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getLocationByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.LOCATION(idOrName), config);
  }

  getLocationAreaByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.LOCATION_AREA(idOrName),
      config
    );
  }

  getRegionList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.REGION_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getRegionByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.REGION(idOrName), config);
  }

  getGenerationList(limit = 20, offset = 0, config?: RequestInit) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.GENERATION_LIST}?limit=${limit}&offset=${offset}`,
      config
    );
  }

  getGenerationByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.GENERATION(idOrName),
      config
    );
  }

  getEvolutionChainById(id: number, config?: RequestInit) {
    return this.httpClient.get<DTOEvolutionChain>(
      POKEMON_V2_API_URLS.EVOLUTION_CHAIN(id),
      config
    );
  }

  getGenderByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.GENDER(idOrName), config);
  }

  getGrowthRateByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.GROWTH_RATE(idOrName),
      config
    );
  }

  getNatureByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.NATURE(idOrName), config);
  }

  getStatByIdOrName(idOrName: string | number, config?: RequestInit) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.STAT(idOrName), config);
  }
}