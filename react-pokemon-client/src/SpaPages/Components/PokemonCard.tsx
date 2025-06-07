import { usePokemonByIdOrName } from '../../api/pokeapi.co/pokemonAPIHooks';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { IPokemon } from '../../api/pokeapi.co/localReturnTypes'; 


interface PokemonCardProps {
  name: string;
  sx?: SxProps<Theme>; // For layout wiring
}

export default function PokemonCard({ name, sx }: PokemonCardProps) {
  const query = usePokemonByIdOrName(name);
  const data: IPokemon | undefined = query.data;
  const isLoading = query.isLoading;

  if (isLoading) {
    return (
      <Card sx={{ ...sx, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Loading {name}...</Typography>
      </Card>
    );
  }
//deconstructuring the data, I dont like that there is no clear interfacte here... hmm 
 // --killed it with an interface>//const img = data?.sprites.front_default ?? '';
  //const types = data?.types.map((t) => t.type.name).join(', ') ?? '';

  return (
    <Card sx={{ ...sx, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
      {/* Header bar */}
      <Box sx={{ height: '4px', backgroundColor: 'grey.500' }} />

      {/* Upper third */}
      <Box sx={{ display: 'flex', flex: '1 1 33%', p: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {data?.types}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {data?.img && (
            <CardMedia
              component="img"
              image={data?.img}
              alt={name}
              sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          )}
        </Box>
      </Box>

      {/* Lower 2/3rds */}
      <CardContent sx={{ flex: '1 1 60%' }}>
        <Typography variant="body2" color="text.secondary">
          {/* Placeholder for future description */}
          { 'No description available.'}    
          </Typography>     
        {/* Placeholder for future stats */}
      </CardContent>
    </Card>
  );
}