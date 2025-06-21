import type { SxProps, Theme } from '@mui/material';
import type { IPokemon } from '../../../services/pokeapi.co.query/data-pokemon';

export interface ICardGridProps {
  sx?: SxProps<Theme>;
  pokemons: IPokemon[];
}