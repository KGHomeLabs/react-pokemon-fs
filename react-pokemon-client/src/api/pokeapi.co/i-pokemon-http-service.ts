import type { DTOResourceList, DTOPokemon, DTONamedResource, DTOPokemonSpecies, DTOEvolutionChain } from './data-pokemon-api';

export interface IPokemonHTTPService {
  getPokemonList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getPokemonByIdOrName(idOrName: string | number): Promise<DTOPokemon>;
  getPokemonSpeciesList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getPokemonSpeciesByIdOrName(idOrName: string | number): Promise<DTOPokemonSpecies>;
  getAbilityList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getAbilityByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getTypeList(): Promise<DTOResourceList>;
  getTypeByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getMoveList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getMoveByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getMoveCategoryByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getMoveDamageClassByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getItemList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getItemByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getItemCategoryByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getItemPocketByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getLocationList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getLocationByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getLocationAreaByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getRegionList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getRegionByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getGenerationList(limit?: number, offset?: number): Promise<DTOResourceList>;
  getGenerationByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getEvolutionChainById(id: number): Promise<DTOEvolutionChain>;
  getGenderByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getGrowthRateByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getNatureByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
  getStatByIdOrName(idOrName: string | number): Promise<DTONamedResource>;
}