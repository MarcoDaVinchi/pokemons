import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { IPokemon, IAbility } from '../types/interfaces';

const API_URL: string = environment.pokeApiURL;
const IMG_URL: string = environment.pokeApiImgURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  public async getPokemons(): Promise<IPokemon[]> {
    let pokemonsList: IPokemon[] = [];
    const count = await this.getPokemonsCount();
    const pokemons = await this.fetchUrl(`${API_URL}/pokemon`);
    for (let item of pokemons.results) {
      const details = await this.fetchUrl(item.url);
      const props = {
        id: details.id,
        image: `${IMG_URL}/${details.id}.png`,
        abilities: details.abilities.map((i) => i.ability),
      };

      pokemonsList.push({ ...item, ...props });
    }

    return pokemonsList;
  }

  public getPokemonByName(pokeName) {
    return null;
  }

  public async getAbilityInfo(abilityUrl): Promise<IAbility> {
    const rawAbilityData = await this.fetchUrl(abilityUrl);
    const abilityInfo = {
      id: rawAbilityData.id,
      name: rawAbilityData.name,
      url: abilityUrl,
      effect: findLocalizedEffectEntry(rawAbilityData, 'en'),
    };

    return abilityInfo;

    function findLocalizedEffectEntry(ability: any, lang: string) {
      const localizedEffect = ability.effect_entries.find(
        (effect_entry) => effect_entry.language.name === lang
      ).effect;
      if (localizedEffect) {
        return localizedEffect;
      } else {
        return `No ${lang} localized effect entry`;
      }
    }
  }

  public async getPokemonsCount() {
    const pokemonsQuery = await this.fetchUrl(`${API_URL}/pokemon`);
    return pokemonsQuery.count;
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
