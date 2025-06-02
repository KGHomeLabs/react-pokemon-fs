import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  img: string;
}

interface PokemonContextType {
  cards: Pokemon[];
  loading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error('usePokemonContext must be used within a PokemonProvider');
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
  useApi?: boolean;
  customCards?: Pokemon[];
}

export const PokemonProvider = ({ children, useApi = true, customCards = [] }: PokemonProviderProps) => {
  const [cards, setCards] = useState<Pokemon[]>(customCards);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 20;

  useEffect(() => {
    if (!useApi) {
      setCards(customCards);
      setTotalCount(customCards.length);
      setLoading(false);
      return;
    }

    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const results = response.data.results;
        setTotalCount(response.data.count);
        const pokemonData = await Promise.all(
          results.map(async (poke: { name: string; url: string }) => {
            const detailResponse = await axios.get(poke.url);
            return {
              name: detailResponse.data.name,
              img: detailResponse.data.sprites.front_default,
            };
          })
        );
        setCards(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <PokemonContext.Provider value={{ cards, loading, page, totalPages, setPage }}>
      {children}
    </PokemonContext.Provider>
  );
};