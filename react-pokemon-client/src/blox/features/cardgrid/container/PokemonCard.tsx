import { useState } from 'react';
import { Card, Box } from '@mui/material';

//outer Interface 
import type { IPokemonCardProps } from './i-pokemon-card-props';

//Owned by this Feature
import { getRibbonColor } from './utils/poke-type2color';
import cardStyles from '../CardLayout.module.css';

///IN: Services, Context, Components
import { usePokemonByIdOrNameQuery } from '../../../services/pokeapi.co.query/pokemon-query-hooks';
import type { IPokemon } from '../../../services/pokeapi.co.query/data-pokemon'

//Sets a method
import { useFullPokemonList } from '../../../Context/IPokemonContext';
import CardIsLoading from './Components/CardIsLoading';
import FunctionRibbon from './Components/FunctionRibbon';
import { CardHeader } from './Components/CardHeader';
import { CardMainContent } from './Components/CardMainContent';


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

        {/*Header of Main Content, I sperated it in two, this is top... I'm not a designer :-) */}
        <CardHeader imageUrl={data?.img} name={name} pokeTypes={data?.types?.join(' / ')}></CardHeader>

        <CardMainContent></CardMainContent>
      </Card>
    </Box>
  );
}