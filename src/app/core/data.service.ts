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

  public async getPokemons(): Promise<IPokemon[]> {
    let pokemonsList: IPokemon[] = [];

    // let pokemons: {} = {};

    // this.fetchUrl(`${API_URL}/pokemon`).then((data) => {
    //   // pokemons = data;
    //   for (let item of data.results) {
    //     let details;
    //     details = this.fetchUrl(item.url).then((det) => {
    //       return { id: det.id, abilities: det.abilities };
    //     });
    //     item.id = details.id;
    //     item.image = `${IMG_URL}/${item.id}.png`;
    //     item.abilities = details.abilities.map((i) => i.ability);

    //     pokemonsList.push(item);
    //   }
    // });

    let data = await this.fetchUrl(`${API_URL}/pokemon`);
    // pokemons = data;
    for (let item of data.results) {
      let details = await this.fetchUrl(item.url);
      // details = this.fetchUrl(item.url).then((det) => {
      //   return { id: det.id, abilities: det.abilities };
      // });
      item.id = details.id;
      item.image = `${IMG_URL}/${item.id}.png`;
      item.abilities = details.abilities.map((i) => i.ability);

      pokemonsList.push(item);
    }

    return pokemonsList;
    // return pokemonsList;
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

  private async fetchUrl(url) {
    let response = await fetch(url);

    if (response.ok) {
      let result = await response.json();
      return result;
    } else {
      console.error('HTTP Error: ' + response.status);
      return null;
    }
  }
}
