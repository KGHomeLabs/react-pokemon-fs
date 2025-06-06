import { usePokemonByIdOrName } from '../../api/pokeapi.co/pokemonAPIHooks';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface PokemonCardProps {
  name: string;
}

export default function PokemonCard({ name }: PokemonCardProps)
 {
  const { data, isLoading } = usePokemonByIdOrName(name);

  if (isLoading) {
    return <Typography>Loading {name}...</Typography>;
  }

  const img = data?.sprites.front_default ?? '';

  return (
    <Card>
      {img && <CardMedia component="img" height="140" image={img} alt={name} />}
      <CardContent>
        <Typography variant="h6">{name}</Typography>
      </CardContent>
    </Card>
  );
};