import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

interface Pokemon {
  name: string;
  img: string;
}

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
          image={card.img}
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