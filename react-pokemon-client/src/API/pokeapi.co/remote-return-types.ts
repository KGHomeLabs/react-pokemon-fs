
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}


export interface IAPIPokemon {
  id: number;
  name: string;
  abilities: IPokemonAbility[];
  types: IPokemonType[];
  sprites: IPokemonSprites;
  // Add other fields as needed
}
export interface IPokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface IPokemonSprites {
  front_default: string | null;
  // Add other sprite fields as needed
}


