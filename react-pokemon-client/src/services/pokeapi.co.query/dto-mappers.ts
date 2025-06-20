import type { IAPIPokemon, APIResourceList, IAPIPokemonSpecies, IAPIEvolutionChain, IAPIEvolutionChainLink } from '../../api/pokeapi.co/i-pokemon-api';
import type { IPokemon, IPokemonListResult, IPokemonSpecies, IEvolutionChain, IEvolutionChainLink } from './data-pokemon';

export const toIPokemon = (api: IAPIPokemon): IPokemon => ({
  id: api.id,
  name: api.name,
  img: api.sprites.front_default ?? null,
  types: api.types.map(t => t.type.name),
  abilities: api.abilities.map(a => a.ability.name),
  stats: {},
});

export const toPokemonListResult = (apiList: APIResourceList): IPokemonListResult => ({
  count: apiList.count,
  results: apiList.results.map((r) => ({
    id: -1,
    name: r.name,
    img: r.url,
    types: [],
    abilities: [],
    stats: {},
  })),
});

export const toIPokemonSpecies = (api: IAPIPokemonSpecies): IPokemonSpecies => ({
  id: api.id,
  name: api.name,
  evolutionChainId: parseInt(api.evolution_chain.url.split('/').filter(Boolean).pop() || '0', 10),
});

export const toIEvolutionChain = (api: IAPIEvolutionChain): IEvolutionChain => ({
  id: api.id,
  chain: toIEvolutionChainLink(api.chain),
});

const toIEvolutionChainLink = (api: IAPIEvolutionChainLink): IEvolutionChainLink => ({
  speciesName: api.species?.name ?? '',
  evolvesTo: api.evolves_to?.map(toIEvolutionChainLink) ?? [],
});