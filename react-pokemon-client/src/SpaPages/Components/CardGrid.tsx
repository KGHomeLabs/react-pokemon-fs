import { Box} from '@mui/material';
import PokemonCard from './PokemonCard';
import type { SxProps, Theme } from '@mui/material';
import type { IPokemon } from '../../api/pokeapi.co/local-return-types';

interface ICardGridProps {
  sx?: SxProps<Theme>;
  cards: IPokemon[]; 
}

const CardGrid = ({ sx, cards }: ICardGridProps) => (
  <Box sx={sx}>
    {cards.map((pokemon) => (
      <Box key={pokemon.name} 
          sx={{width: '100%', aspectRatio: '2 / 3', maxWidth: 240,}}>
        <PokemonCard
          name={pokemon.name}
          sx={{...sx,
            display: 'flex',
            cursor: 'pointer', //cool this makes it a button pointer
            flexDirection: 'column',
            borderRadius: 2,
            height: '100%',
            backgroundColor: 'background.paper',
            boxShadow: 3,
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: 6,
              }
            }}
          >            
        </PokemonCard>
      </Box>
  ))}
  </Box>
);

export default CardGrid;