import { Box} from '@mui/material';
import PokemonCard from './PokemonCard';
import type { SxProps, Theme } from '@mui/material';
import type { Pokemon } from '../../api/pokeapi.co/APIReturnTypes';

interface ICardGridProps {
  sx?: SxProps<Theme>;
  cards: Pokemon[];
}

const CardGrid = ({ sx,cards }: ICardGridProps) => (
  <Box sx={sx}>
    {cards.map((pokemon) => (
      <PokemonCard key={pokemon.name} name={pokemon.name} />
    ))}
  </Box>
);

export default CardGrid;