export interface IPokemon {
  id: number;
  name: string;
  img: string | null;
  types: string[];
  abilities: string[];
  stats: Record<string, number>;
}

export interface IPokemonListResult {
  count: number;
  results: IPokemon[];
}

export interface IPokemonListParams {
  limit?: number;
  offset?: number;
}