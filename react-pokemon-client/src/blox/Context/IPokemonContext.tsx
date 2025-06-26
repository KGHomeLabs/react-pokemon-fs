import React, { createContext, useContext, useState } from 'react';
import { usePokemonListQuery } from '../../services/pokeapi.co.query/pokemon-query-hooks';
import type { IPokemon } from '../../services/pokeapi.co.query/data-pokemon';

interface IPokemonContextValue {
  pokemons: IPokemon[];
  isLoading: boolean;
  error: unknown;
  filterByPokemonName: string | null;
  setFilterByPokemonName: (name: string | null) => void;
}

const PokemonContext = createContext<IPokemonContextValue | null>(null);

export const PokemonContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, isLoading, error } = usePokemonListQuery({ limit: 100_000, offset: 0 });
  const [filterByPokemonName, setFilterByPokemonName] = useState<string | null>(null);

  return (
    <PokemonContext.Provider
      value={{
        pokemons: data?.results ?? [],
        isLoading,
        error,
        filterByPokemonName,
        setFilterByPokemonName,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default function useFullPokemonList() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('useFullPokemonList must be inside <PokemonContextProvider>');
  return ctx;
}