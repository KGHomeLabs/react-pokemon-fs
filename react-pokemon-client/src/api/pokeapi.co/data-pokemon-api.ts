export class DTONamedResource {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export class DTOResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: DTONamedResource[];

  constructor(count: number, next: string | null, previous: string | null, results: DTONamedResource[]) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}

export class DTOPokemon {
  id: number;
  name: string;
  abilities: DTOPokemonAbility[];
  types: DTOPokemonType[];
  sprites: DTOPokemonSprites;

  constructor(id: number, name: string, abilities: DTOPokemonAbility[], types: DTOPokemonType[], sprites: DTOPokemonSprites) {
    this.id = id;
    this.name = name;
    this.abilities = abilities;
    this.types = types;
    this.sprites = sprites;
  }
}

export class DTOPokemonAbility {
  ability: DTONamedResource;
  is_hidden: boolean;
  slot: number;

  constructor(ability: DTONamedResource, is_hidden: boolean, slot: number) {
    this.ability = ability;
    this.is_hidden = is_hidden;
    this.slot = slot;
  }
}

export class DTOPokemonType {
  slot: number;
  type: DTONamedResource;

  constructor(slot: number, type: DTONamedResource) {
    this.slot = slot;
    this.type = type;
  }
}

export class DTOPokemonSprites {
  front_default: string | null;

  constructor(front_default: string | null) {
    this.front_default = front_default;
  }
}

export class DTOPokemonSpecies {
  id: number;
  name: string;
  evolution_chain: DTONamedResource;

  constructor(id: number, name: string, evolution_chain: DTONamedResource) {
    this.id = id;
    this.name = name;
    this.evolution_chain = evolution_chain;
  }
}

export class DTOEvolutionChain {
  id: number;
  chain: DTOEvolutionChainLink;

  constructor(id: number, chain: DTOEvolutionChainLink) {
    this.id = id;
    this.chain = chain;
  }
}

export class DTOEvolutionChainLink {
  species: DTONamedResource;
  evolves_to: DTOEvolutionChainLink[];

  constructor(species: DTONamedResource, evolves_to: DTOEvolutionChainLink[]) {
    this.species = species;
    this.evolves_to = evolves_to;
  }
}