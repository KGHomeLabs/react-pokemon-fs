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

const mockCards = [
  { name: 'Pikachu', img: 'pikachu.png' },
  { name: 'Charizard', img: 'charizard.png' },
  { name: 'Blastoise', img: 'blastoise.png' },
  { name: 'Venusaur', img: 'venusaur.png' },
  { name: 'Mewtwo', img: 'mewtwo.png' },
  { name: 'Gyarados', img: 'gyarados.png' },
  { name: 'Snorlax', img: 'snorlax.png' },
  { name: 'Arcanine', img: 'arcanine.png' },
  { name: 'Dragonite', img: 'dragonite.png' },
  { name: 'Gengar', img: 'gengar.png' },
  { name: 'Alakazam', img: 'alakazam.png' }
];

export default function MyDeckPage() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Title + New Deck */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">My Deck</Typography>
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
        {mockCards.map((card) => (
          <Card key={card.name}>
            <CardMedia
              component="img"
              height="140"
              image={`/cards/${card.img}`}
              alt={card.name}
            />
            <CardContent>
              <Typography align="center">{card.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Footer Text */}
      <Box textAlign="center" mt={5}>
        <Typography>Your deck is looking great! Add more cards or try different sorting options.</Typography>
      </Box>
    </Box>
  );
}