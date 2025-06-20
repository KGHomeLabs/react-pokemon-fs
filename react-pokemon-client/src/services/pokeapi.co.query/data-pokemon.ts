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

export interface IPokemonSpecies {
  id: number;
  name: string;
  evolutionChainId: number; // Extracted ID for the evolution chain
}

export interface IEvolutionChain {
  id: number;
  chain: IEvolutionChainLink;
}

export interface IEvolutionChainLink {
  speciesName: string;
  evolvesTo: IEvolutionChainLink[];
}