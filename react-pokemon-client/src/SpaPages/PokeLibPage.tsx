
import { usePokemonContext } from './Context/PokemonContext';
import CardGrid from '../Components/CardGrid';
import {Box, Button, Typography, Select, MenuItem, Stack} from '@mui/material';
import Footer from '../Components/Footer';


export default function PokeLibPage() {
  const { cards, loading, page, totalPages, setPage } = usePokemonContext();

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      {/* Title + New Deck */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} bgcolor={'#f5f5f5'} p={2} borderRadius={1}>
        <Button variant="contained" color="error">+ New Deck</Button>
      </Box>

      {/* Sort Options */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <Typography>Sort by:</Typography>
        <Button variant="contained" color="error">Type</Button>
        <Select size="small" value="name">
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rarity">Rarity</MenuItem>
          <MenuItem value="set">Set</MenuItem>
        </Select>
      </Stack>

      {/* Card Grid */}
      <CardGrid cards={cards} />

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3} gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>

      {/* Footer Text */}
      <Footer sx={{textAlign:'center', mt: 5}}/>
    </Box>
  );
}