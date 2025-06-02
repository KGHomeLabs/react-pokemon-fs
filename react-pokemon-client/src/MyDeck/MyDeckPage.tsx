import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  Stack,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import axios from 'axios';

// Define TypeScript interface for Pokémon data
interface Pokemon {
  name: string;
  img: string; // URL to sprite
}

export default function MyDeckPage() {
  const [cards, setCards] = useState<Pokemon[]>([]); // Pokémon data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [page, setPage] = useState<number>(1); // Current page
  const [totalCount, setTotalCount] = useState<number>(0); // Total Pokémon count
  const limit = 20; // Items per page

  // Fetch Pokémon data from PokeAPI
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // Calculate offset for pagination (e.g., page 1 = offset 0, page 2 = offset 20)
        const offset = (page - 1) * limit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const results = response.data.results;
        setTotalCount(response.data.count); // Total Pokémon from API

        // Fetch details for each Pokémon
        const pokemonData = await Promise.all(
          results.map(async (poke: { name: string; url: string }) => {
            const detailResponse = await axios.get(poke.url);
            return {
              name: detailResponse.data.name,
              img: detailResponse.data.sprites.front_default, // Sprite URL
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
  }, [page]); // Re-run when page changes

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Handle navigation
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

      {/* Card Grid using CSS Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: 2
        }}
      >
        {cards.map((card) => (
          <Card key={card.name}>
            <CardMedia
              component="img"
              height="140"
              image={card.img}
              alt={card.name}
            />
            <CardContent>
              <Typography align="center">{card.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

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
      <Box textAlign="center" mt={5}>
        <Typography>Your deck is looking great! Add more cards or try different sorting options.</Typography>
      </Box>
    </Box>
  );
}