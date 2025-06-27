import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, Stack, TextField } from '@mui/material';

//Components/Features
import CardGrid from '../blox/features/cardgrid/CardGrid';
import PokemonStdButton from '../blox/Components/PokemonStdButton';
import Footer from '../blox/Components/Footer';

///IN: Services, Context, Components //State/Context/DI
import useFullPokemonList from '../blox/Context/IPokemonContext';
import HookDIRegistry from '../di/DIHookRegistry';
import type IPokemonQueryService from '../services/pokeapi.co.query/i-pokemon-query-service';
import type { IPokemon } from '../services/pokeapi.co.query/data-pokemon';

//Utils
import useDebounce from '../blox/CustomHooks/useDebounce';

import { Paginator } from '../blox/features/pagination/Paginator';
import { useFilteredPokemonMemo } from '../blox/CustomHooks/useFilteredPokemonMemo';

const PAGE_SIZE = 20;

export default function PokeLibPage() {

  // STATE get the full IPokemon[] array, I think it camye from the context
  const { pokemons, isLoading, error, filterByPokemonName, setFilterByPokemonName } = useFullPokemonList();

  //behält den state aus suchfeld, wird immmer beim tippen der suche gesetzt
  const [search, setSearch] = useState('');

  //services
  const queryService: IPokemonQueryService = HookDIRegistry.use<IPokemonQueryService>();

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
  const speciesQuery = queryService.usePokemonSpeciesByIdOrName(speciesName);
  const evolutionQuery = queryService.useEvolutionChainById(speciesQuery.data?.evolutionChainId ?? 0);

  //run function every time the pokemons array or debounced search changes
  //but... tres importante... only the value changed no re-renders
  //useRef for functions
  // Compute filtered Pokémon list  from actually three differenct use cases:
  // 1. When the user searches for a Pokémon by name then debounced is not null
  // 2. When the user filters by Pokémon name then filterByPokemonName is not set from inside the pokemon card
  // 3. when both are not set, then we show all pokemons the full list of pokemons from the context
  const filtered: IPokemon[] = useFilteredPokemonMemo(
    pokemons,
    debounced,
    filterByPokemonName,
    speciesQuery.data,
    evolutionQuery.data
  );

  // pagination values
  const [page, setPage] = useState(1);
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;

  // this implemnts pagination and produces filtered array of IPokemon
  const subset = filtered.slice(offset, offset + PAGE_SIZE);

  // reset page when search changes with a valid debounce
  // this is to reset the page to 1 when the search changes
  // so that the user doesn't end up on a page that doesn't exist
  useEffect(() => {
    setPage(1);
  }, [debounced, filterByPokemonName]);

  //Handle isLoading state for entire page
  if (isLoading) return <Typography>Loading Pokémon list…</Typography>;
  //Handle error state for entire page related to fetching the list
  if (error) return <Typography color="error">Error loading list</Typography>;
  //Handle error state for species or evolution queries when filtering by Pokémon name
  // This is to handle the case where the species or evolution chain data is not found
  if (filterByPokemonName && (speciesQuery.error || evolutionQuery.error)) {
    return (
      <Typography color="error">
        Error loading series for {filterByPokemonName}: {speciesQuery.error?.message || evolutionQuery.error?.message || 'Invalid species'}
      </Typography>
    );
  }
  // if none of the above conditions are met, render the page
  // this is the main content of the page, showing the Pokémon list and the filter/search
  return (
    <Box sx={{ p: 4 }}>
      {/* Top bar */}
      <Box display="flex" justifyContent="space-between" mb={4} bgcolor="#f5f5f5" p={2} borderRadius={1}>
        {/* The silly test button */}
        <PokemonStdButton>The Test</PokemonStdButton>
        {/* Filter by Pokémon series shows only when filter active */}
        {filterByPokemonName && (
          <PokemonStdButton onClick={() => setFilterByPokemonName(null)}>
            Clear Filter
          </PokemonStdButton>
        )}
      </Box>

      {/* Sort + Search */}
      <Stack direction="row" spacing={3} mb={3} alignItems="center">
        <TextField label="Search by name" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
      </Stack>

      {total === 0 ? (
        <Typography>No Pokémon match “{search}”</Typography>
      ) : (
        <>
          <CardGrid pokemons={subset}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 1
            }}
          />

          {/* Pagination */}
          <Paginator currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )
      }
      <Footer textAlign={'center'} marginTop={3} />
    </Box>
  );
}