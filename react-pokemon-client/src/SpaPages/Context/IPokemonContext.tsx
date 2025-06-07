// src/contexts/PokemonListContext.tsx
import React, { createContext, useContext } from 'react';
import { usePokemonList } from '../../api/pokeapi.co/pokemon-query-hooks';
import type { IPokemon } from '../../api/pokeapi.co/local-return-types';

interface IPokemonContextContextValue {
  pokemons: IPokemon[];
  isLoading: boolean;
  error: unknown;
}

const PokemonContext = createContext<IPokemonContextContextValue | null>(null);

export const PokemonContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // fetch *all* entries once
  const { data, isLoading, error } = usePokemonList({ limit: 100_000, offset: 0 });

  return (
    <PokemonContext.Provider
      value={{
        pokemons: data?.results ?? [],
        isLoading,
        error,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export function useFullPokemonList() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('useFullPokemonList must be inside <PokemonListProvider>');
  return ctx;
}