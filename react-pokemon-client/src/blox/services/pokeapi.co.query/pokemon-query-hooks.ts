import { useQuery } from '@tanstack/react-query';
import { pokemonClient } from '../../../api/pokeapi.co/pokemon-client';
import { toIPokemon, toPokemonListResult,toIPokemonSpecies,toIEvolutionChain } from './dto-mappers';
import type { IPokemon, 
  IPokemonListResult, 
  IPokemonListParams,
  IPokemonSpecies,
  IEvolutionChain } from './data-pokemon';


export const usePokemonListQuery = ({ limit = 20, offset = 0 }: IPokemonListParams = {}) =>
  useQuery<IPokemonListResult, Error>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: async () => {
      const response = await pokemonClient.getPokemonList(limit, offset);
      return toPokemonListResult(response);
    },
  });

export const usePokemonByIdOrNameQuery = (idOrName: string | number) =>
  useQuery<IPokemon>({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      const raw = await pokemonClient.getPokemonByIdOrName(idOrName);
      return toIPokemon(raw);
    },
  });

export const usePokemonSpeciesList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['pokemonSpeciesList', limit, offset], queryFn: () => pokemonClient.getPokemonSpeciesList(limit, offset) });

export const usePokemonSpeciesByIdOrName = (idOrName: string | number | null) =>
  useQuery<IPokemonSpecies, Error>({
    queryKey: ['pokemonSpecies', idOrName],
    queryFn: async () => {
      if (!idOrName) {
        throw new Error('Valid idOrName is required for fetching Pokémon species');
      }
      const raw = await pokemonClient.getPokemonSpeciesByIdOrName(idOrName);
      if (!raw.id || !raw.name || !raw.evolution_chain) {
        throw new Error(`Invalid species data for ${idOrName}`);
       } 
      return toIPokemonSpecies(raw);
    },
    enabled: !!idOrName && (typeof idOrName !== 'string' || idOrName.trim() !== ''),
  });

export const useAbilityList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['abilityList', limit, offset], queryFn: () => pokemonClient.getAbilityList(limit, offset) });

export const useAbilityByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['ability', idOrName], queryFn: () => pokemonClient.getAbilityByIdOrName(idOrName) });

export const useTypeList = () =>
  useQuery({ queryKey: ['typeList'], queryFn: pokemonClient.getTypeList });

export const useTypeByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['type', idOrName], queryFn: () => pokemonClient.getTypeByIdOrName(idOrName) });

export const useMoveList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['moveList', limit, offset], queryFn: () => pokemonClient.getMoveList(limit, offset) });

export const useMoveByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['move', idOrName], queryFn: () => pokemonClient.getMoveByIdOrName(idOrName) });

export const useMoveCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveCategory', idOrName], queryFn: () => pokemonClient.getMoveCategoryByIdOrName(idOrName) });

export const useMoveDamageClassByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveDamageClass', idOrName], queryFn: () => pokemonClient.getMoveDamageClassByIdOrName(idOrName) });

export const useItemList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['itemList', limit, offset], queryFn: () => pokemonClient.getItemList(limit, offset) });

export const useItemByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['item', idOrName], queryFn: () => pokemonClient.getItemByIdOrName(idOrName) });

export const useItemCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemCategory', idOrName], queryFn: () => pokemonClient.getItemCategoryByIdOrName(idOrName) });

export const useItemPocketByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemPocket', idOrName], queryFn: () => pokemonClient.getItemPocketByIdOrName(idOrName) });

export const useLocationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['locationList', limit, offset], queryFn: () => pokemonClient.getLocationList(limit, offset) });

export const useLocationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['location', idOrName], queryFn: () => pokemonClient.getLocationByIdOrName(idOrName) });

export const useLocationAreaByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['locationArea', idOrName], queryFn: () => pokemonClient.getLocationAreaByIdOrName(idOrName) });

export const useRegionList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['regionList', limit, offset], queryFn: () => pokemonClient.getRegionList(limit, offset) });

export const useRegionByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['region', idOrName], queryFn: () => pokemonClient.getRegionByIdOrName(idOrName) });

export const useGenerationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['generationList', limit, offset], queryFn: () => pokemonClient.getGenerationList(limit, offset) });

export const useGenerationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['generation', idOrName], queryFn: () => pokemonClient.getGenerationByIdOrName(idOrName) });

export const useEvolutionChainById = (id: number) =>
  useQuery<IEvolutionChain, Error>({
    queryKey: ['evolutionChain', id],
    queryFn: async () => {
      const raw = await pokemonClient.getEvolutionChainById(id);
      if (!raw.id || !raw.chain || !raw.chain.species) {
        throw new Error(`Invalid evolution chain data for ID ${id}`);
      }
      return toIEvolutionChain(raw);
    },
    enabled: id > 0,
  });

export const useGenderByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['gender', idOrName], queryFn: () => pokemonClient.getGenderByIdOrName(idOrName) });

export const useGrowthRateByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['growthRate', idOrName], queryFn: () => pokemonClient.getGrowthRateByIdOrName(idOrName) });

export const useNatureByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['nature', idOrName], queryFn: () => pokemonClient.getNatureByIdOrName(idOrName) });

export const useStatByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['stat', idOrName], queryFn: () => pokemonClient.getStatByIdOrName(idOrName) });
