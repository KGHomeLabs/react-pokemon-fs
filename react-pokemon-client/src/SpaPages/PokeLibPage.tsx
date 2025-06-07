import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Stack, TextField } from '@mui/material';
import CardGrid from './Components/CardGrid';
import PokemonStdButton from './Components/PokemonStdButton';
import Footer from './Components/Footer';
import useDebounce from './CustomHooks/useDebounce';
import { useFullPokemonList } from './Context/IPokemonContext';
import type { IPokemon } from '../api/pokeapi.co/local-return-types';

const PAGE_SIZE = 20;

export default function PokeLibPage() {
  // get the full IPokemon[] array, I think it came from the context
  const { pokemons, isLoading, error } = useFullPokemonList();
  //behält den state aus suchfeld, wird immmer beim tippen der suche gesetzt
  const [search, setSearch] = useState('');
  //wenn sich search ändert soll ein timer gesetzt werden, this sets that timer while typing
  //debounced is whatever input of search is after 240ms of no typing
  const debounced = useDebounce(search, 240);

  //run function every time the pokemons array or debounced search changes
  //but... tres importante... only the value changed no re-renders
  //useRef for functions
  const filtered: IPokemon[] = useMemo(  //<.... this are what we work with
    () => pokemons.filter(
      (p) => p.name.toLowerCase().includes(debounced.toLowerCase())),
      [pokemons, debounced]
  );

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
  }, [debounced]);

  if (isLoading) return <Typography>Loading Pokémon list…</Typography>;
  if (error)     return <Typography color="error">Error loading list</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      {/* Top bar */}
      <Box display="flex" justifyContent="space-between" mb={4} bgcolor="#f5f5f5" p={2} borderRadius={1}>
        <PokemonStdButton>New Deck</PokemonStdButton>
      </Box>

      {/* Sort + Search */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <Typography>Sort by:</Typography>
        <PokemonStdButton>Type</PokemonStdButton>
        <Select size="small" value="name">
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rarity">Rarity</MenuItem>
          <MenuItem value="set">Set</MenuItem>
        </Select>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      {/* Card Grid or Empty */}
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
      )}

      <Footer sx={{ textAlign: 'center', mt: 5 }} />
    </Box>
  );
}