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

    let pokemons;

    this.fetchUrl(`${API_URL}/pokemon`).then((data) => {
      pokemons = data;
      pokemons.map((item) => {
        let details;
        this.fetchUrl(item.url).then((det) => (details = det));

        item.id = details.id;
        item.image = `${IMG_URL}/${item.id}.png`;
        item.abilities = details.abilities.map((i) => i.ability);

        pokemonsList.push(item);
      });
    });

    return pokemonsList;
  }

  public getPokemonById(pokeId: number) {}

  public getPokemonByName(pokeName) {
    let res;
    this.fetchUrl(`${API_URL}/pokemon/${pokeName}`).then(
      (data) => (res = data)
    );
    return res;
  }

  public getPokemonsCount() {
    let count: number;
    this.fetchUrl(`${API_URL}/pokemon`).then((data) => {
      count = data.count;
    });
    return count;
  }

  private fetchUrl(url) {
    return fetch(url).then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      },
      (failResponse) => {
        return null;
      }
    );
  }
}
