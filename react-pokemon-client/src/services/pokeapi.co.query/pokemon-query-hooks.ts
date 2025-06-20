import { useQuery } from '@tanstack/react-query';

//Types and mapping
import { toIPokemon, toPokemonListResult, toIPokemonSpecies, toIEvolutionChain } from './dto-mappers';
import type { IPokemon, IPokemonListResult, IPokemonListParams, IPokemonSpecies, IEvolutionChain } from './data-pokemon';

//services and service interfaces
import { PokemonHTTPService } from '../../api/pokeapi.co/pokemon-http-service';
import type { IPokemonQueryService } from './i-pokemon-query-service';
import type { IPokemonHTTPService } from '../../api/pokeapi.co/i-pokemon-http-service';

//Get the HTTP Pokemon Service
const pokemonService: IPokemonHTTPService = new PokemonHTTPService;

export const usePokemonListQuery = ({ limit = 20, offset = 0 }: IPokemonListParams = {}) =>
  useQuery<IPokemonListResult, Error>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: async () => {
      const response = await pokemonService.getPokemonList(limit, offset);
      return toPokemonListResult(response);
    },
  });

export const usePokemonByIdOrNameQuery = (idOrName: string | number) =>
  useQuery<IPokemon>({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      const raw = await pokemonService.getPokemonByIdOrName(idOrName);
      return toIPokemon(raw);
    },
  });

export const usePokemonSpeciesList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['pokemonSpeciesList', limit, offset], queryFn: () => pokemonService.getPokemonSpeciesList(limit, offset) });

export const usePokemonSpeciesByIdOrName = (idOrName: string | number | null) =>
  useQuery<IPokemonSpecies, Error>({
    queryKey: ['pokemonSpecies', idOrName],
    queryFn: async () => {
      if (!idOrName) {
        throw new Error('Valid idOrName is required for fetching Pokémon species');
      }
      const raw = await pokemonService.getPokemonSpeciesByIdOrName(idOrName);
      if (!raw.id || !raw.name || !raw.evolution_chain) {
        throw new Error(`Invalid species data for ${idOrName}`);
       } 
      return toIPokemonSpecies(raw);
    },
    enabled: !!idOrName && (typeof idOrName !== 'string' || idOrName.trim() !== ''),
  });

export const useAbilityList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['abilityList', limit, offset], queryFn: () => pokemonService.getAbilityList(limit, offset) });

export const useAbilityByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['ability', idOrName], queryFn: () => pokemonService.getAbilityByIdOrName(idOrName) });

export const useTypeList = () =>
  useQuery({ queryKey: ['typeList'], queryFn: pokemonService.getTypeList });

export const useTypeByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['type', idOrName], queryFn: () => pokemonService.getTypeByIdOrName(idOrName) });

export const useMoveList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['moveList', limit, offset], queryFn: () => pokemonService.getMoveList(limit, offset) });

export const useMoveByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['move', idOrName], queryFn: () => pokemonService.getMoveByIdOrName(idOrName) });

export const useMoveCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveCategory', idOrName], queryFn: () => pokemonService.getMoveCategoryByIdOrName(idOrName) });

export const useMoveDamageClassByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveDamageClass', idOrName], queryFn: () => pokemonService.getMoveDamageClassByIdOrName(idOrName) });

export const useItemList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['itemList', limit, offset], queryFn: () => pokemonService.getItemList(limit, offset) });

export const useItemByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['item', idOrName], queryFn: () => pokemonService.getItemByIdOrName(idOrName) });

export const useItemCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemCategory', idOrName], queryFn: () => pokemonService.getItemCategoryByIdOrName(idOrName) });

export const useItemPocketByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemPocket', idOrName], queryFn: () => pokemonService.getItemPocketByIdOrName(idOrName) });

export const useLocationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['locationList', limit, offset], queryFn: () => pokemonService.getLocationList(limit, offset) });

export const useLocationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['location', idOrName], queryFn: () => pokemonService.getLocationByIdOrName(idOrName) });

export const useLocationAreaByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['locationArea', idOrName], queryFn: () => pokemonService.getLocationAreaByIdOrName(idOrName) });

export const useRegionList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['regionList', limit, offset], queryFn: () => pokemonService.getRegionList(limit, offset) });

export const useRegionByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['region', idOrName], queryFn: () => pokemonService.getRegionByIdOrName(idOrName) });

export const useGenerationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['generationList', limit, offset], queryFn: () => pokemonService.getGenerationList(limit, offset) });

export const useGenerationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['generation', idOrName], queryFn: () => pokemonService.getGenerationByIdOrName(idOrName) });

export const useEvolutionChainById = (id: number) =>
  useQuery<IEvolutionChain, Error>({
    queryKey: ['evolutionChain', id],
    queryFn: async () => {
      const raw = await pokemonService.getEvolutionChainById(id);
      if (!raw.id || !raw.chain || !raw.chain.species) {
        throw new Error(`Invalid evolution chain data for ID ${id}`);
      }
      return toIEvolutionChain(raw);
    },
    enabled: id > 0,
  });

export const useGenderByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['gender', idOrName], queryFn: () => pokemonService.getGenderByIdOrName(idOrName) });

export const useGrowthRateByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['growthRate', idOrName], queryFn: () => pokemonService.getGrowthRateByIdOrName(idOrName) });

export const useNatureByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['nature', idOrName], queryFn: () => pokemonService.getNatureByIdOrName(idOrName) });

export const useStatByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['stat', idOrName], queryFn: () => pokemonService.getStatByIdOrName(idOrName) });


export const PokemonQueryService: IPokemonQueryService = {
  usePokemonListQuery,
  usePokemonByIdOrNameQuery,
  usePokemonSpeciesByIdOrName,
  useEvolutionChainById,
};
//typecheck to ensure that this is actually a fit
void (PokemonQueryService as IPokemonQueryService);
