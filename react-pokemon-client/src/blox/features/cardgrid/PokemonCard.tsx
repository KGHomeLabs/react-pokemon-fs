import { useState } from 'react';
import { Card, Box } from '@mui/material';

//Exposed Interface 
import type { IPokemonCardProps } from './i-pokemon-card-props';

///IN: Services, Context, Components //State/Context/DI
import type { IPokemon } from '../../../services/pokeapi.co.query/data-pokemon'
import type IPokemonQueryService from '../../../services/pokeapi.co.query/i-pokemon-query-service';
import useFullPokemonList from '../../Context/IPokemonContext';
import HookDIRegistry from '../../../utils/DIHookRegistry';

//Owned by this Feature
import CardIsLoading from './container/Components/CardIsLoading';
import FunctionRibbon from './container/Components/FunctionRibbon';
import CardHeader from './container/Components/CardHeader';
import CardMainContent from './container/Components/CardMainContent';
import getRibbonColor from './container/utils/poke-type2color';

//Styles
import cardStyles from './CardLayout.module.css';

export default function PokemonCard(InputProps: IPokemonCardProps) {
  //states
  const { setFilterByPokemonName } = useFullPokemonList();
  const [hovered, setHovered] = useState(false);
  //services
  const queryService: IPokemonQueryService = HookDIRegistry.use<IPokemonQueryService>();
  //database queries
  const query = queryService.usePokemonByIdOrNameQuery(InputProps.name);
  const data: IPokemon | undefined = query.data;
  const isLoading = query.isLoading;

  //Logic begins
  const mainType = data?.types?.[0] ?? 'normal';
  const ribbonColor = getRibbonColor(mainType);

  //Display a loading message if the data is still being fetched
  //TODO: maybe use a skeleton instead? make it a bit more fancy?
  if (isLoading) {
    return (
      <Box key={InputProps.name} className={cardStyles.cardContainer}>
        <CardIsLoading className={cardStyles.loadingCard} />
      </Box>
    );
  }

  return (
    <Box key={InputProps.name} className={cardStyles.cardContainer} >
      <Card className={cardStyles.cardTopLevelLayout}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top Ribbon at the top of the card, it shows a color for the type*/}
        <Box className={cardStyles.ribbon} sx={{ backgroundColor: ribbonColor }} />
        {/* Little card speciffic function area to appear e.g. on hover for card speciffic functions*/}
        <FunctionRibbon name={InputProps.name} hovered={hovered} filterCallback={setFilterByPokemonName}></FunctionRibbon>
        {/*Header of Main Content, I sperated it in two, this is top... I'm not a designer :-) */}
        <CardHeader imageUrl={data?.img} name={InputProps.name} pokeTypes={data?.types?.join(' / ')}></CardHeader>
        <CardMainContent></CardMainContent>
      </Card>
    </Box>
  );
}