import type { IPokemonListParams, IPokemonListResult, IPokemon, IPokemonSpecies, IEvolutionChain } from './data-pokemon';

export default interface IPokemonQueryService {
  usePokemonListQuery: (params?: IPokemonListParams) => { data: IPokemonListResult | undefined, isLoading: boolean, error: Error | null };
  usePokemonByIdOrNameQuery: (idOrName: string | number) => { data: IPokemon | undefined, isLoading: boolean, error: Error | null };
  usePokemonSpeciesByIdOrName: (idOrName: string | number | null) => { data: IPokemonSpecies | undefined, isLoading: boolean, error: Error | null };
  useEvolutionChainById: (id: number) => { data: IEvolutionChain | undefined, isLoading: boolean, error: Error | null };  
}