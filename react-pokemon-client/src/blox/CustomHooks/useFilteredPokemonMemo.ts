import { useMemo } from "react";
import type { IPokemon, IEvolutionChainLink, IPokemonSpecies, IEvolutionChain } from "../../services/pokeapi.co.query/data-pokemon";

const getEvolutionNames = (chain: IEvolutionChainLink, pokemons: IPokemon[]): string[] => {
  if (!chain.speciesName) 
    return [];
  let names = [chain.speciesName];
  if (chain.evolvesTo.length > 0) {
    chain.evolvesTo.forEach((evo) => {
      names.push(...getEvolutionNames(evo, pokemons));
    });
  } else {
    // Add Mega Evolutions for final species
    const megaForms = pokemons
      .filter((p) => new RegExp(`^${chain.speciesName}-mega(-[xy])?$`, "i").test(p.name))
      .map((p) => p.name);
    names = [...names, ...megaForms];
  }
  return [...new Set(names)];
};
//Function taeks the full list of pokemons and filters them by the search input
export function useFilteredPokemonMemo(
  pokemons: IPokemon[],
  debounced: string,
  filterByPokemonName: string | null,
  speciesQueryData: IPokemonSpecies | undefined,
  evolutionQueryData: IEvolutionChain | undefined
): IPokemon[] {
  return useMemo(() => {
    if (filterByPokemonName && speciesQueryData && evolutionQueryData) {
      const pokemonNames = getEvolutionNames(evolutionQueryData.chain, pokemons);
      return pokemonNames
        .map((name) => pokemons.find((p) => p.name === name))
        .filter((p): p is IPokemon => !!p);
    }
    if (!debounced) {
      // If debounced is an empty string, return all pokemons directly
      return pokemons;
    }
    //else filter by debounced search input and return results    
    return pokemons.filter((p) => p.name.toLowerCase().includes(debounced.toLowerCase()));
  }, [pokemons, debounced, filterByPokemonName, speciesQueryData, evolutionQueryData]);
}