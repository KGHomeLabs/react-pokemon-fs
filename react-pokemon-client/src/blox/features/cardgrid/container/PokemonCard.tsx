import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

//outer Interface 
import type { IPokemonCardProps } from './i-pokemon-card-props';

//Owned by this Feature
import { getRibbonColor } from './utils/poke-type2color';
import cardStyles from '../CardLayout.module.css';

///IN: Services, Context, Components
import { usePokemonByIdOrNameQuery } from '../../../services/pokeapi.co.query/pokemon-query-hooks';
import type { IPokemon } from '../../../services/pokeapi.co.query/i-pokemon-query'

//Sets a method
import { useFullPokemonList } from '../../../Context/IPokemonContext';
import CardIsLoading from './Components/CardIsLoading';
import FunctionRibbon from './Components/FunctionRibbon';


export default function PokemonCard({ name }: IPokemonCardProps) {
  const query = usePokemonByIdOrNameQuery(name);
  const { setFilterByPokemonName } = useFullPokemonList();
  const data: IPokemon | undefined = query.data;
  const isLoading = query.isLoading;
  const [hovered, setHovered] = useState(false);

  const mainType = data?.types?.[0] ?? 'normal';
  const ribbonColor = getRibbonColor(mainType);

  //Display a loading message if the data is still being fetched
  //TODO: maybe use a skeleton instead? make it a bit more fancy?
  if (isLoading) {
    return (
      <Box key={name} className={cardStyles.cardContainer}>
        <CardIsLoading className={cardStyles.loadingCard} />
      </Box>
    );
  }

  return (
    <Box key={name} className={cardStyles.cardContainer} >
      <Card className={cardStyles.cardTopLevelLayout}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top Ribbon at the top of the card, it shows a color for the type*/}
        <Box className={cardStyles.ribbon} sx={{ backgroundColor: ribbonColor }} />
        {/* Little card speciffic function area to appear e.g. on hover for card speciffic functions*/}
        <FunctionRibbon name={name} hovered={hovered} filterCallback={setFilterByPokemonName}></FunctionRibbon>

        {/* Main Content, I sperated it in two, this is top... I'm not a designer :-) */}
        <Box sx={{
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

        <CardContent
          sx={{
            flex: '1 1 auto',
            p: 1,
            m: 0,
            '&:last-child': { pb: 1 } // this took forever to find. override MUI's default extra bottom padding          
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {'No description displayed (yet).'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}