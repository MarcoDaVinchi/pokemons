import { Injectable } from '@angular/core';

import { IPokemon, IAbility, IPokemonList } from '../types/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private api: ApiService) {}

  public async getPokemonsDash(
    limit?: number,
    nextPageUrl?: string,
  ): Promise<IPokemonList> {
    return this.api.getPokemonsDash(nextPageUrl, limit);
  }

  public getPokemonById(pokeId: number) {}

  public async getPokemonsSummaryList(amount?: number) {
    return this.api.getPokemonsSummaryList(amount);
  }

  public async getPokemonByUrl(url) {
    return this.api.getPokemonByUrl(url);
  }

  public getPokemonByName(pokeName) {
    return this.api.getPokemonByName(pokeName);
  }

  public getPokemonsCount() {
    return this.api.getPokemonsCount();
  }
}
