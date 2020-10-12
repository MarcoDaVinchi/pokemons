import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { IPokemon, IAbility } from '../shared/interfaces';

const API_URL: string = environment.pokeApiURL;
const IMG_URL: string = environment.pokeApiImgURL;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public getPokemons(): IPokemon[] {
    let pokemonsList: IPokemon[];

    let pokemons = fetch(`${API_URL}/pokemon`)
      .then(
        (response) => {
          if (response.status !== 200) {
            return null;
          } else {
            return response.json();
          }
        },
        (failResponse) => {
          return null;
        }
      )
      .then((data) => {
        pokemonsList = data.map((item) => {
          let pokemon: IPokemon;
              pokemon.name = i.name;
              pokemon.id = i.id;
              pokemon.abilities = i.abilities.map((item) => item.ability);
              pokemon.image = `${IMG_URL}/${pokemon.id}.png`;
        };) });
    
    // let results = await Promise.all(pokemons);

    // let response: Response = await fetch(`${API_URL}/pokemons`);
    // if (response.ok) {
    //   let json = await response.json();
    //   for (const i of json) {
    //     let pokemon: IPokemon;
    //     pokemon.name = i.name;
    //     pokemon.id = i.id;
    //     pokemon.abilities = i.abilities.map((item) => item.ability);
    //     pokemon.image = `${IMG_URL}/${pokemon.id}.png`;

    //     pokemonsList.push(pokemon);
    //   }
    // } else {
    //   console.error('HTTP request error: ' + response.status);
    // }
  }

  public getPokemonById(pokeId: number) {}

  public getPokemonsCount() {}
}
