import { POKEMON_V2_API_URLS } from './urls';
import type IHttpClient from '../../lib/http-client/i-http-client';
import type IPokemonHTTPService from './i-pokemon-http-service';
import type { DTOResourceList, DTOPokemon, DTONamedResource, DTOPokemonSpecies, DTOEvolutionChain } from './data-pokemon-api';


export default class PokemonHTTPService implements IPokemonHTTPService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getPokemonList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTOPokemon>(POKEMON_V2_API_URLS.POKEMON(idOrName));
  }

  getPokemonSpeciesList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_SPECIES_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonSpeciesByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTOPokemonSpecies>(
      POKEMON_V2_API_URLS.POKEMON_SPECIES(idOrName)
    );
  }

  getAbilityList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.ABILITY_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getAbilityByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ABILITY(idOrName)
    );
  }

  getTypeList() {
    return this.httpClient.get<DTOResourceList>(POKEMON_V2_API_URLS.TYPE_LIST);
  }

  getTypeByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.TYPE(idOrName));
  }

  getMoveList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.MOVE_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getMoveByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.MOVE(idOrName));
  }

  getMoveCategoryByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.MOVE_CATEGORY(idOrName)
    );
  }

  getMoveDamageClassByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.MOVE_DAMAGE_CLASS(idOrName)
    );
  }

  getItemList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.ITEM_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getItemByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.ITEM(idOrName));
  }

  getItemCategoryByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ITEM_CATEGORY(idOrName)
    );
  }

  getItemPocketByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.ITEM_POCKET(idOrName)
    );
  }

  getLocationList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.LOCATION_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getLocationByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.LOCATION(idOrName));
  }

  getLocationAreaByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.LOCATION_AREA(idOrName)
    );
  }

  getRegionList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.REGION_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getRegionByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.REGION(idOrName));
  }

  getGenerationList(limit = 20, offset = 0) {
    return this.httpClient.get<DTOResourceList>(
      `${POKEMON_V2_API_URLS.GENERATION_LIST}?limit=${limit}&offset=${offset}`
    );
  }

  getGenerationByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.GENERATION(idOrName)
    );
  }

  getEvolutionChainById(id: number) {
    return this.httpClient.get<DTOEvolutionChain>(
      POKEMON_V2_API_URLS.EVOLUTION_CHAIN(id)
    );
  }

  getGenderByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.GENDER(idOrName));
  }

  getGrowthRateByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(
      POKEMON_V2_API_URLS.GROWTH_RATE(idOrName)
    );
  }

  getNatureByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.NATURE(idOrName));
  }

  getStatByIdOrName(idOrName: string | number) {
    return this.httpClient.get<DTONamedResource>(POKEMON_V2_API_URLS.STAT(idOrName));
  }
}