import { useQuery } from '@tanstack/react-query';
import { pokemonClient } from './PokemonClient';

export const usePokemonList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['pokemonList', limit, offset], queryFn: () => pokemonClient.getPokemonList(limit, offset) });

export const usePokemonByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['pokemon', idOrName], queryFn: () => pokemonClient.getPokemonByIdOrName(idOrName) });

export const usePokemonSpeciesList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['pokemonSpeciesList', limit, offset], queryFn: () => pokemonClient.getPokemonSpeciesList(limit, offset) });

export const usePokemonSpeciesByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['pokemonSpecies', idOrName], queryFn: () => pokemonClient.getPokemonSpeciesByIdOrName(idOrName) });

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
  useQuery({ queryKey: ['evolutionChain', id], queryFn: () => pokemonClient.getEvolutionChainById(id) });

export const useGenderByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['gender', idOrName], queryFn: () => pokemonClient.getGenderByIdOrName(idOrName) });

export const useGrowthRateByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['growthRate', idOrName], queryFn: () => pokemonClient.getGrowthRateByIdOrName(idOrName) });

export const useNatureByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['nature', idOrName], queryFn: () => pokemonClient.getNatureByIdOrName(idOrName) });

export const useStatByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['stat', idOrName], queryFn: () => pokemonClient.getStatByIdOrName(idOrName) });
