export interface IPokemon {
  name: string;
  id: number;
  abilities: IAbility[];
  image: string;
}

export interface IAbility {
  name: string;
  url: string;
}
