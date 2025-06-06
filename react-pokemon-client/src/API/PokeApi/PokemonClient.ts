import { createAxiosInstance } from '../HttpClient/AxiosInstance';
import { HttpClient } from '../HttpClient/HttpClient';
import { POKEMON_V2_API_URLS } from '../urls';


export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  front_default: string | null;
  // Add other sprite fields as needed
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
  // Add other fields as needed
}

const axiosInstance = createAxiosInstance(POKEMON_V2_API_URLS.BASE_URL);
const httpClient = new HttpClient(axiosInstance);

export const pokemonClient = {
  // Pokémon
  getPokemonList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_LIST}?limit=${limit}&offset=${offset}`
    ),
  getPokemonByIdOrName: (idOrName: string | number) =>
    httpClient.get<Pokemon>(POKEMON_V2_API_URLS.POKEMON(idOrName)),

  // Pokémon Species
  getPokemonSpeciesList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.POKEMON_SPECIES_LIST}?limit=${limit}&offset=${offset}`
    ),
  getPokemonSpeciesByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.POKEMON_SPECIES(idOrName)
    ),

  // Abilities
  getAbilityList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.ABILITY_LIST}?limit=${limit}&offset=${offset}`
    ),
  getAbilityByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.ABILITY(idOrName)
    ),

  // Types
  getTypeList: () =>
    httpClient.get<APIResourceList>(POKEMON_V2_API_URLS.TYPE_LIST),
  getTypeByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.TYPE(idOrName)),

  // Moves
  getMoveList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.MOVE_LIST}?limit=${limit}&offset=${offset}`
    ),
  getMoveByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.MOVE(idOrName)),
  getMoveCategoryByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.MOVE_CATEGORY(idOrName)
    ),
  getMoveDamageClassByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.MOVE_DAMAGE_CLASS(idOrName)
    ),

  // Items
  getItemList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.ITEM_LIST}?limit=${limit}&offset=${offset}`
    ),
  getItemByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.ITEM(idOrName)),
  getItemCategoryByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.ITEM_CATEGORY(idOrName)
    ),
  getItemPocketByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.ITEM_POCKET(idOrName)
    ),

  // Locations
  getLocationList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.LOCATION_LIST}?limit=${limit}&offset=${offset}`
    ),
  getLocationByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.LOCATION(idOrName)),
  getLocationAreaByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.LOCATION_AREA(idOrName)
    ),

  // Regions
  getRegionList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.REGION_LIST}?limit=${limit}&offset=${offset}`
    ),
  getRegionByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.REGION(idOrName)),

  // Generations
  getGenerationList: (limit = 20, offset = 0) =>
    httpClient.get<APIResourceList>(
      `${POKEMON_V2_API_URLS.GENERATION_LIST}?limit=${limit}&offset=${offset}`
    ),
  getGenerationByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.GENERATION(idOrName)
    ),

  // Evolution Chains
  getEvolutionChainById: (id: number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.EVOLUTION_CHAIN(id)
    ),

  // Genders
  getGenderByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.GENDER(idOrName)),

  // Growth Rates
  getGrowthRateByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(
      POKEMON_V2_API_URLS.GROWTH_RATE(idOrName)
    ),

  // Natures
  getNatureByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.NATURE(idOrName)),

  // Stats
  getStatByIdOrName: (idOrName: string | number) =>
    httpClient.get<NamedAPIResource>(POKEMON_V2_API_URLS.STAT(idOrName)),
};