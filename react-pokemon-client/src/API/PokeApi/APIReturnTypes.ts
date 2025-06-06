export interface Pokemon {
  name: string;
  img: string | null;
}

export interface PokemonListResult {
  count: number;
  results: Pokemon[];
}

export interface PokemonListParams {
  limit?: number;
  offset?: number;
}