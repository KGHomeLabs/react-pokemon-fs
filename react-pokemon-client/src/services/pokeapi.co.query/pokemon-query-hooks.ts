import { useQuery } from '@tanstack/react-query';

//Types and mapping
import { toIPokemon, toPokemonListResult, toIPokemonSpecies, toIEvolutionChain } from './dto-mappers';
import type { IPokemon, IPokemonListResult, IPokemonListParams, IPokemonSpecies, IEvolutionChain } from './data-pokemon';

//import PokemonHTTPService from '../../api/pokeapi.co/pokemon-http-service';
import type IPokemonQueryService from './i-pokemon-query-service';

// Resolver for the Pokemon HTTP service gets the tsyringe container instance
import PokemonServiceResolver from './pokemon-service-resolver';

export const usePokemonListQuery = ({ limit = 20, offset = 0 }: IPokemonListParams = {}) =>
  
  useQuery<IPokemonListResult, Error>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: async ({signal}) => {
      const pokemonService = PokemonServiceResolver.get();
      const response = await pokemonService.getPokemonList(limit, offset,{signal});
      return toPokemonListResult(response);
    },
  });

export const usePokemonByIdOrNameQuery = (idOrName: string | number) =>
  useQuery<IPokemon>({
    queryKey: ['pokemon', idOrName],
    queryFn: async ({signal}) => {
      const pokemonService = PokemonServiceResolver.get();
      const raw = await pokemonService.getPokemonByIdOrName(idOrName,{signal});
      return toIPokemon(raw);
    },
  });

export const usePokemonSpeciesList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['pokemonSpeciesList', limit, offset], 
    queryFn: ({signal}) => {
      const pokemonService = PokemonServiceResolver.get();
      return pokemonService.getPokemonSpeciesList(limit, offset,{signal});
    }
  });

export const usePokemonSpeciesByIdOrName = (idOrName: string | number | null) =>
  useQuery<IPokemonSpecies, Error>({
    queryKey: ['pokemonSpecies', idOrName],
    queryFn: async ({signal}) => {
      if (!idOrName) {
        throw new Error('Valid idOrName is required for fetching Pokémon species');
      }
      const pokemonService = PokemonServiceResolver.get();
      const raw = await pokemonService.getPokemonSpeciesByIdOrName(idOrName,{signal});
      if (!raw.id || !raw.name || !raw.evolution_chain) {
        throw new Error(`Invalid species data for ${idOrName}`);
       } 
      return toIPokemonSpecies(raw);
    },
    enabled: !!idOrName && (typeof idOrName !== 'string' || idOrName.trim() !== ''),
  });

export const useAbilityList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['abilityList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getAbilityList(limit, offset,{signal});
  }});

export const useAbilityByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['ability', idOrName], queryFn: ({signal}) => {
      const pokemonService = PokemonServiceResolver.get();
      return pokemonService.getAbilityByIdOrName(idOrName,{signal});
    }
  });

export const useTypeList = () =>
  useQuery({ queryKey: ['typeList'], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getTypeList({signal});
  }});

export const useTypeByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['type', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getTypeByIdOrName(idOrName,{signal});
  }});

export const useMoveList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['moveList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getMoveList(limit, offset,{signal});
  }});

export const useMoveByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['move', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getMoveByIdOrName(idOrName,{signal});
  }});

export const useMoveCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveCategory', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getMoveCategoryByIdOrName(idOrName,{signal});
  }});

export const useMoveDamageClassByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['moveDamageClass', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getMoveDamageClassByIdOrName(idOrName,{signal});
  }});

export const useItemList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['itemList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getItemList(limit, offset,{signal});
  }});

export const useItemByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['item', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getItemByIdOrName(idOrName,{signal});
  }});

export const useItemCategoryByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemCategory', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getItemCategoryByIdOrName(idOrName,{signal});
  }});

export const useItemPocketByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['itemPocket', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getItemPocketByIdOrName(idOrName,{signal});
  }});

export const useLocationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['locationList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getLocationList(limit, offset,{signal});
  }});

export const useLocationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['location', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getLocationByIdOrName(idOrName,{signal});
  }});

export const useLocationAreaByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['locationArea', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getLocationAreaByIdOrName(idOrName,{signal});
  }});

export const useRegionList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['regionList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getRegionList(limit, offset,{signal});
  }});

export const useRegionByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['region', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getRegionByIdOrName(idOrName,{signal});
  }});

export const useGenerationList = (limit = 20, offset = 0) =>
  useQuery({ queryKey: ['generationList', limit, offset], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getGenerationList(limit, offset,{signal});
  }});

export const useGenerationByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['generation', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getGenerationByIdOrName(idOrName,{signal});
  }});

export const useEvolutionChainById = (id: number) =>
  useQuery<IEvolutionChain, Error>({
    queryKey: ['evolutionChain', id],
    queryFn: async ({signal}) => {
      const pokemonService = PokemonServiceResolver.get();
      const raw = await pokemonService.getEvolutionChainById(id,{signal});
      if (!raw.id || !raw.chain || !raw.chain.species) {
        throw new Error(`Invalid evolution chain data for ID ${id}`);
      }
      return toIEvolutionChain(raw);
    },
    enabled: id > 0,
  });

export const useGenderByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['gender', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getGenderByIdOrName(idOrName,{signal});
  }});

export const useGrowthRateByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['growthRate', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getGrowthRateByIdOrName(idOrName,{signal});
  }});

export const useNatureByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['nature', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getNatureByIdOrName(idOrName,{signal});
  }});

export const useStatByIdOrName = (idOrName: string | number) =>
  useQuery({ queryKey: ['stat', idOrName], queryFn: ({signal}) => {
    const pokemonService = PokemonServiceResolver.get();
    return pokemonService.getStatByIdOrName(idOrName,{signal});
  }});

export const PokemonQueryService: IPokemonQueryService = {
  usePokemonListQuery,
  usePokemonByIdOrNameQuery,
  usePokemonSpeciesByIdOrName,
  useEvolutionChainById,
};
//typecheck to ensure that this is actually a fit
void (PokemonQueryService as IPokemonQueryService);
