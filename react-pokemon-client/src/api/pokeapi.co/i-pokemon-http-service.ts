import type { DTOResourceList, DTOPokemon, DTONamedResource, DTOPokemonSpecies, DTOEvolutionChain } from './data-pokemon-api';

export const IPokemonHTTPServiceToken = Symbol.for('IPokemonHTTPService');

export default interface IPokemonHTTPService {
  getPokemonList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getPokemonByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTOPokemon>;
  getPokemonSpeciesList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getPokemonSpeciesByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTOPokemonSpecies>;
  getAbilityList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getAbilityByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getTypeList(config?: RequestInit): Promise<DTOResourceList>;
  getTypeByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getMoveList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getMoveByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getMoveCategoryByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getMoveDamageClassByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getItemList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getItemByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getItemCategoryByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getItemPocketByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getLocationList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getLocationByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getLocationAreaByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getRegionList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getRegionByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getGenerationList(limit?: number, offset?: number, config?: RequestInit): Promise<DTOResourceList>;
  getGenerationByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getEvolutionChainById(id: number, config?: RequestInit): Promise<DTOEvolutionChain>;
  getGenderByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getGrowthRateByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getNatureByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
  getStatByIdOrName(idOrName: string | number, config?: RequestInit): Promise<DTONamedResource>;
}