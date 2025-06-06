import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import type { Pokemon } from '../API/PokeApi/APIReturnTypes';

interface ICardGridProps {
  cards: Pokemon[];
}

const CardGrid = ({ cards }: ICardGridProps) => (
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
          image={card.img ?? 'https://via.placeholder.com/140'}
          alt={card.name}
        />
        <CardContent>
          <Typography align="center">{card.name}</Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default CardGrid;