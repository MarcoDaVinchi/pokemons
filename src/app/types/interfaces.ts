export interface IPokemon {
  name: string;
  id: number;
  abilities: IAbility[];
  image: string;
  url: string;
}

export interface IPokemonSummary {
  name: string;
  url: string;
}

export interface IPokemonSummaryList{
  count: string;
  next: string|null;
  previous: string|null;
  results: IPokemonSummary[];
}

export interface IAbility {
  id: number;
  name: string;
  url: string;
  effect: string;
}
