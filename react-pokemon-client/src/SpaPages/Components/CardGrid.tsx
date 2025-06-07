import { Box} from '@mui/material';
import PokemonCard from './PokemonCard';
import type { SxProps, Theme } from '@mui/material';
import type { IPokemon } from '../../api/pokeapi.co/localReturnTypes';

interface ICardGridProps {
  sx?: SxProps<Theme>;
  cards: IPokemon[];
}

const CardGrid = ({ sx, cards }: ICardGridProps) => (
  <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2, ...sx,   }}>
    
    {cards.map((pokemon) => (<Box key={pokemon.name} sx={{width: '100%', aspectRatio: '2 / 3', maxWidth: 240,}}    >
        <PokemonCard
          name={pokemon.name}
          sx={{
            height: '100%',
            backgroundColor: 'background.paper',
            boxShadow: 3,
          }}
        />
      </Box>
    ))}
  </Box>
);

export default CardGrid;