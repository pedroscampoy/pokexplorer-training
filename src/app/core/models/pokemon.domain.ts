export interface PokemonListElement {
  name: string;
  url: string;
}

interface IPokemon {
  id: number;
  abilities: any[];
  base_experience: number;
  game_indices: any[];
  height: number;
  name: string;
  order: number;
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;
}

export class Pokemon implements IPokemon {
  id: number;
  abilities: any[];
  base_experience: number;
  game_indices: any[];
  height: number;
  name: string;
  order: number;
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;

  constructor(obj: IPokemon) {
    this.id = (obj && obj.id) || 0;
    this.abilities = (obj && obj.abilities) || [];
    this.base_experience = (obj && obj.base_experience) || 0;
    this.game_indices = (obj && obj.game_indices) || [];
    this.height = (obj && obj.height) || 0;
    this.name = (obj && obj.name) || '';
    this.order = (obj && obj.order) || 0;
    this.sprites = (obj && obj.sprites) || [];
    this.stats = (obj && obj.stats) || [];
    this.types = (obj && obj.types) || [];
    this.weight = (obj && obj.weight) || 0;
  }
}
