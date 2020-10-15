export interface IPokemon {
  name: string;
  id: number;
  abilities: IAbility[];
  image: string;
  url: string;
}

export interface IAbility {
  id: number;
  name: string;
  url: string;
  effect: string;
}
