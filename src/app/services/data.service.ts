import { Injectable } from '@angular/core';

import { IPokemon, IAbility } from '../types/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private api: ApiService) {}

  public async getPokemonsDash(): Promise<IPokemon[]> {
    return this.api.getPokemonsDash();
  }

  public getPokemonById(pokeId: number) {}

  public async getPokemonsSummaryList() {
    return this.api.getPokemonsSummaryList();
  }

  public async getPokemonByUrl(url) {
    return this.api.getPokemonByUrl(url);
  };

  public getPokemonByName(pokeName) {
    return this.api.getPokemonByName(pokeName);
  }

  public getPokemonsCount() {
    return this.api.getPokemonsCount();
  }
}
