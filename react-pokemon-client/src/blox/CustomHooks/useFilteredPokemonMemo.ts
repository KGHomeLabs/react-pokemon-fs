import { useMemo } from "react";
import type { IPokemon, IEvolutionChainLink, IPokemonSpecies, IEvolutionChain } from "../../services/pokeapi.co.query/data-pokemon";

export const useFilteredPokemonMemo = (
  pokemons: IPokemon[],
  debounced: string,
  filterByPokemonName: string | null,
  speciesQueryData: IPokemonSpecies | undefined,
  evolutionQueryData: IEvolutionChain | undefined
): IPokemon[] => {
  return useMemo(() => {
    if (filterByPokemonName && speciesQueryData && evolutionQueryData) {
      const getEvolutionNames = (chain: IEvolutionChainLink): string[] => {
        if (!chain.speciesName) return [];
        let names = [chain.speciesName];
        if (chain.evolvesTo.length > 0) {
          chain.evolvesTo.forEach((evo) => {
            names.push(...getEvolutionNames(evo));
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
      const pokemonNames = getEvolutionNames(evolutionQueryData.chain);
      return pokemonNames
        .map((name) => pokemons.find((p) => p.name === name))
        .filter((p): p is IPokemon => !!p);
    }
    return pokemons.filter((p) => p.name.toLowerCase().includes(debounced.toLowerCase()));
  }, [pokemons, debounced, filterByPokemonName, speciesQueryData, evolutionQueryData]);
};