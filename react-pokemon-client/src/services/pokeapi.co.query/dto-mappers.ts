import type { DTOPokemon, DTOResourceList, DTOPokemonSpecies, DTOEvolutionChain, DTOEvolutionChainLink } from '../../api/pokeapi.co/data-pokemon-api';
import type { IPokemon, IPokemonListResult, IPokemonSpecies, IEvolutionChain, IEvolutionChainLink } from './data-pokemon';

export const toIPokemon = (api: DTOPokemon): IPokemon => ({
  id: api.id,
  name: api.name,
  img: api.sprites.front_default ?? null,
  types: api.types.map(t => t.type.name),
  abilities: api.abilities.map(a => a.ability.name),
  stats: {},
});

export const toPokemonListResult = (apiList: DTOResourceList): IPokemonListResult => ({
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

export const toIPokemonSpecies = (api: DTOPokemonSpecies): IPokemonSpecies => ({
  id: api.id,
  name: api.name,
  evolutionChainId: parseInt(api.evolution_chain.url.split('/').filter(Boolean).pop() || '0', 10),
});

export const toIEvolutionChain = (api: DTOEvolutionChain): IEvolutionChain => ({
  id: api.id,
  chain: toIEvolutionChainLink(api.chain),
});

const toIEvolutionChainLink = (api: DTOEvolutionChainLink): IEvolutionChainLink => ({
  speciesName: api.species?.name ?? '',
  evolvesTo: api.evolves_to?.map(toIEvolutionChainLink) ?? [],
});