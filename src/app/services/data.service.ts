import { Injectable } from '@angular/core';

import { IPokemon, IAbility } from '../types/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private api: ApiService) {}

  public async getPokemons(): Promise<IPokemon[]> {
    return this.api.getPokemons();
  }

  public getPokemonById(pokeId: number) {}

  public getPokemonByName(pokeName) {
    return this.api.getPokemonByName(pokeName);
  }

  public getPokemonsCount() {
    return this.api.getPokemonsCount;
  }
}
