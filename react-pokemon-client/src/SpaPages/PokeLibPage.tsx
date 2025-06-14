import { useState, useMemo, useEffect } from 'react';
import { toast} from 'react-toastify';
import { Box, Typography, Stack, TextField } from '@mui/material';
import CardGrid from './Components/CardGrid';
import PokemonStdButton from './Components/PokemonStdButton';
import Footer from './Components/Footer';
import useDebounce from './CustomHooks/useDebounce';
import { useFullPokemonList } from './Context/IPokemonContext';
import { usePokemonSpeciesByIdOrName, useEvolutionChainById } from '../api/pokeapi.co/pokemon-query-hooks';
import { Logger,LogLevel } from '../utils/logger'
import type { IPokemon,IEvolutionChainLink } from '../api/pokeapi.co/local-return-types';
import { isDev, isPreview, isProd } from '../../env-switch';
import { getAppEnv } from '../../env-switch';

const PAGE_SIZE = 20;

export default function PokeLibPage() {  
  const rawMetaEnv = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_APP_ENV !== undefined ? import.meta.env.VITE_APP_ENV : 'undefined';
  const computedEnv = getAppEnv();

  // get the full IPokemon[] array, I think it came from the context
  const { pokemons, isLoading, error, filterByPokemonName, setFilterByPokemonName } = useFullPokemonList();
  //behält den state aus suchfeld, wird immmer beim tippen der suche gesetzt
  const [search, setSearch] = useState('');
  //wenn sich search ändert soll ein timer gesetzt werden, this sets that timer while typing
  //debounced is whatever input of search is after 240ms of no typing
  const debounced = useDebounce(search, 240);


  useEffect(() => {
    if (filterByPokemonName) {
      toast.info(`Filtering by Pokémon: ${filterByPokemonName}`);
      setSearch('');
    }
  }, [filterByPokemonName]);

  const speciesName = filterByPokemonName
    ? filterByPokemonName.replace(/-mega.*$/, '') // e.g., "charizard-mega-x" -> "charizard"
    : null;
// Fetch species and evolution chain data
  const speciesQuery = usePokemonSpeciesByIdOrName(speciesName);
  const evolutionQuery = useEvolutionChainById(speciesQuery.data?.evolutionChainId ?? 0);

  //run function every time the pokemons array or debounced search changes
  //but... tres importante... only the value changed no re-renders
  //useRef for functions
   // Compute filtered Pokémon list
 const filtered: IPokemon[] = useMemo(() => {
    if (filterByPokemonName && speciesQuery.data && evolutionQuery.data) {
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
             .filter(p => new RegExp(`^${chain.speciesName}-mega(-[xy])?$`, 'i').test(p.name))
             .map(p => p.name);
           names = [...names, ...megaForms];
         }

        return [...new Set(names)]; 
      };
      const pokemonNames = getEvolutionNames(evolutionQuery.data.chain);      
      return pokemonNames
        .map((name) => pokemons.find((p) => p.name === name))
        .filter((p): p is IPokemon => !!p);
    }
    return pokemons.filter((p) => p.name.toLowerCase().includes(debounced.toLowerCase()));
  }, [pokemons, debounced, filterByPokemonName, speciesQuery.data, evolutionQuery.data]);

  // pagination values
  const [page, setPage] = useState(1);
  const total     = filtered.length;
  const totalPages= Math.ceil(total / PAGE_SIZE);
  const offset    = (page - 1) * PAGE_SIZE;

   // this implemnts pagination and produces filtered array of IPokemon
  const subset    = filtered.slice(offset, offset + PAGE_SIZE);

  // reset page when search changes with a valid debounce
  // this is to reset the page to 1 when the search changes
  // so that the user doesn't end up on a page that doesn't exist
  useEffect(() => {
    setPage(1);
  }, [debounced,filterByPokemonName]);
  Logger.log(LogLevel.Info, `Envs:dev ${isDev()} or prev ${isPreview()} or prod ${isProd()}}`)
  if (isLoading) return <Typography>Loading Pokémon list…</Typography>;
  if (error)     return <Typography color="error">Error loading list</Typography>;
  if (filterByPokemonName && (speciesQuery.error || evolutionQuery.error)) {
    return (
      <Typography color="error">
        Error loading series for {filterByPokemonName}: {speciesQuery.error?.message || evolutionQuery.error?.message || 'Invalid species'}
      </Typography>
    );
  }
  return (
    <Box sx={{ p: 4 }}>
      {/* Top bar */}
      <Box display="flex" justifyContent="space-between" mb={4} bgcolor="#f5f5f5" p={2} borderRadius={1}>
        <PokemonStdButton>The Test</PokemonStdButton>
        {filterByPokemonName && (
          <PokemonStdButton onClick={() => setFilterByPokemonName(null)}>
            Clear Filter
          </PokemonStdButton>
        )} 
          <PokemonStdButton
              onClick={() => {
                  alert(                    
                    `Raw import.meta.env.VITE_APP_ENV: ${rawMetaEnv}\n` +
                    `Computed Environment: ${computedEnv}`
                  );  
               }}
          >
            Show Environment
          </PokemonStdButton>     
      </Box>

      {/* Sort + Search */}
      <Stack direction="row" spacing={3} mb={3} alignItems="center">
        <TextField
          label="Search by name"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Typography>Sort by: think of some functions here</Typography>
      </Stack>
     
      {total === 0 ? (
        <Typography>No Pokémon match “{search}”</Typography>
      ) : ( 
        <>
          <CardGrid cards={subset} 
                    sx={{display: 'grid', 
                         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                         gap: 2 }}
                         />

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <PokemonStdButton onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </PokemonStdButton>
            <Typography>
              Page {page} of {totalPages}
            </Typography>
            <PokemonStdButton onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
              Next
            </PokemonStdButton>
          </Box>    
        </>          
       )
      }
    
      <Footer sx={{ textAlign: 'center', mt: 5 }} />
    </Box>
  );
}