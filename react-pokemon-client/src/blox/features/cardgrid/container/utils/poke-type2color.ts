export type GameType =
  | 'normal' | 'flying' | 'fire' | 'water' | 'ice'
  | 'grass' | 'bug' | 'poison' | 'electric'
  | 'ground' | 'rock' | 'fighting' | 'psychic'
  | 'ghost' | 'dark' | 'steel' | 'dragon'
  | 'fairy' | 'stellar' | 'unknown';

export type TcgType =
  | 'colorless' | 'fire' | 'water' | 'grass'
  | 'lightning' | 'fighting' | 'psychic'
  | 'darkness' | 'metal' | 'dragon' | 'fairy';

// 2. Strongly type the color map
export const TCG_TYPE_COLORS: Record<TcgType, string> = {
  colorless: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  lightning: '#F7D02C',
  fighting: '#C22E28',
  psychic: '#A33EA1',
  darkness: '#705746',
  metal: '#B7B7CE',
  dragon: '#6F35FC',
  fairy: '#D685AD',
};

// 3. Strongly type the game-to-TCG map
const GAME_TO_TCG_TYPE: Record<GameType, TcgType> = {
  normal: 'colorless',
  flying: 'colorless',
  fire: 'fire',
  water: 'water',
  ice: 'water',
  grass: 'grass',
  bug: 'grass',
  poison: 'psychic',
  electric: 'lightning',
  ground: 'fighting',
  rock: 'fighting',
  fighting: 'fighting',
  psychic: 'psychic',
  ghost: 'psychic',
  dark: 'darkness',
  steel: 'metal',
  dragon: 'dragon',
  fairy: 'fairy',
  stellar: 'colorless',
  unknown: 'colorless',
};

// 4. Final lookup function with safe fallback and validation
export function getRibbonColor(type: string): string {
  const gameType = type.toLowerCase() as GameType;
  const tcgType = GAME_TO_TCG_TYPE[gameType] || 'colorless';
  return TCG_TYPE_COLORS[tcgType];
}