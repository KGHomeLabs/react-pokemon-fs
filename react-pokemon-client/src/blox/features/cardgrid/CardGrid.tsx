import { Box } from '@mui/material';
import PokemonCard from './container/PokemonCard';
import type { ICardGridProps } from './i-cardgrid';


const CardGrid = ({ sx, pokemons }: ICardGridProps) => (
  <Box sx={sx}>
    {pokemons.map((pokemon) => (
      <PokemonCard
        key={pokemon.name}
        name={pokemon.name}
        sx={{ backgroundColor: 'background.paper', boxShadow: 3 }}
      >
      </PokemonCard>
    ))}
  </Box>
);

export default CardGrid;