export interface IPokemon {
  name: string;
  id: number;
  abilities: IAbility[];
  image: string;
  url: string;
}

export interface IAbility {
  name: string;
  url: string;
}
