import type { IAPIPokemon,APIResourceList } from './remote-return-types';
import type { IPokemon,IPokemonListResult } from './local-return-types'; // your UI-facing type

export const toIPokemon = (api: IAPIPokemon): IPokemon => ({
  id: api.id,
  name: api.name,
  img: api.sprites.front_default ?? null,
  types: api.types.map(t => t.type.name),
  abilities: api.abilities.map(a => a.ability.name),
  stats: {} // fill in later if needed
});

export const toPokemonListResult = (apiList: APIResourceList): IPokemonListResult => ({
  count: apiList.count,
  results: apiList.results.map((r) => ({
    id: -1, // Unknown for now
    name: r.name,
    img: r.url, // This is just a placeholder to be resolved later
    types: [],
    abilities: [],
    stats: {},
  })),
});