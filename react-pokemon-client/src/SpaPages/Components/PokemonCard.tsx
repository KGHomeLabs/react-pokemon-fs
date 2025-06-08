import { usePokemonByIdOrName } from '../../api/pokeapi.co/pokemon-query-hooks';
import { Card, CardMedia, CardContent, Typography, Box, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import type { SxProps, Theme } from '@mui/material';
import type { IPokemon } from '../../api/pokeapi.co/local-return-types';
import { getRibbonColor } from '../TypeColor';
import { useState } from 'react';
import { useFullPokemonList } from '../Context/IPokemonContext';

interface PokemonCardProps {
  name: string;
  sx?: SxProps<Theme>; 
}

export default function PokemonCard({ name, sx }: PokemonCardProps) {
  const query = usePokemonByIdOrName(name);
  const { setFilterByPokemonName  } = useFullPokemonList();
  const data: IPokemon | undefined = query.data;
  const isLoading = query.isLoading;
  const [hovered, setHovered] = useState(false);

  const mainType = data?.types?.[0] ?? 'normal';
  const ribbonColor = getRibbonColor(mainType);

  //Display a loading message if the data is still being fetched
  //TODO: maybe use a skeleton instead? make it a bit more fancy?
  if (isLoading) {
    return (
      <Card
        sx={{
          ...sx,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap:"1px",
        }}>
        <Typography>Loading {name}...</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        ...sx,
        position: 'relative',
        overflow: 'hidden',
        gap:"1px"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Ribbon at the top of the card, it shows a color for the type*/}
      <Box sx={{ height: '15px', backgroundColor: ribbonColor, m: 0, p: 0 }} />

      {/*Function buttons in the card*/}
      {/* TODO: I dont like all the design stuff in here
          Function area: shown inline, no absolute positioning */}
      <Box
        sx={{
          height: hovered ? 32 : 0, // Fixed height instead of auto
          overflow: 'hidden',
          transition: 'height 0.2s ease',  
        }}
     >
        {hovered && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: 1,
              py: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              gap: 0.5,
              height: 32,        
            }}
          >
            <IconButton 
              size="small" 
              sx={{ p: '4px' }} 
              title="Filter by Series"  
              onClick={() => setFilterByPokemonName(name)}           
            >
              <FilterIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ p: '4px' }} title="Add to Deck">
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box> {/*end of function area*/}

      {/* Main Content, I sperated it in two, this is top... I'm not a designer :-) */}
      <Box sx= {{
        display: 'flex',
        flex: '1 1 33%',
        px: 1,
        pt: '1px',    
        alignItems: 'flex-start', // exact spacing after the button area
      }}
      >
        <Box sx={{ flex: 1 }} >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom={false} sx={{ m: 0 }}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {data?.types?.join(' / ')}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data?.img && (
            <CardMedia
              component="img"
              image={data?.img}
              alt={name}
              sx={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Box>

      {/* Footer first experiment with custom components*/}
      <CardContent   
        sx={{
          flex: '1 1 auto',
          p: 1,
          m: 0,
          '&:last-child': {pb: 1} // this took forever to find. override MUI's default extra bottom padding          
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {'No description displayed (yet).'}
        </Typography>
      </CardContent>
    </Card>
  );
}