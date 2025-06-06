
import { useState } from 'react';
import {Box, Typography, Select, MenuItem, Stack} from '@mui/material';

//Custom Components
import Footer from './Components/Footer';
//import CardGrid from '../Components/CardGrid';
import CardGrid from './Components/CardGrid';
import PokemonStdButton from './Components/PokemonStdButton';
//API types and hooks
import { usePokemonList } from '../api/pokeapi.co/pokemonAPIHooks';
import type { Pokemon } from   '../api/pokeapi.co/APIReturnTypes';

const PAGE_SIZE = 20;

export default function PokeLibPage() {
  const [ page, setPage ] = useState(1);
  //tells me where the current index starts at
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading } = usePokemonList({limit:PAGE_SIZE, offset});
   // <- lazy-load image details later with usePokemonByIdOrName
  const cards: Pokemon[] = data?.results.map((p: Pokemon) => ({
    name: p.name,
    img: p.img ?? '', //TODO: try lazy-load images later
  })) ?? [];

  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading) return <Typography>Melissa says: Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      {/* Title + New Deck */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} bgcolor={'#f5f5f5'} p={2} borderRadius={1}>
         <PokemonStdButton>New Deck</PokemonStdButton>
      </Box>

      {/* Sort Options */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <Typography>Sort by:</Typography>
        <PokemonStdButton>Type</PokemonStdButton>        
        <Select size="small" value="name">
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rarity">Rarity</MenuItem>
          <MenuItem value="set">Set</MenuItem>
        </Select>
      </Stack>

      {/* Card Grid */}
      <CardGrid cards={data?.results ?? []} 
                sx={{ display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 2 }}
      >

      </CardGrid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3} gap={2}>
        <PokemonStdButton onClick={handlePrevPage} disabled={page===1}>Previous</PokemonStdButton>
          <Typography>Page {page} of {totalPages}</Typography>
        <PokemonStdButton onClick={handleNextPage} disabled={page === totalPages}>Next</PokemonStdButton>
      </Box>

      {/* Footer Text */}
      <Footer sx={{textAlign:'center', mt: 5}}/>
    </Box>
  );
}