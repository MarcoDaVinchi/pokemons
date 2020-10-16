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

  public async getPokemonsDash(nextPageUrl: string = ''): Promise<IPokemon[]> {
    let url: string = nextPageUrl === '' ? `${API_URL}/pokemon` : nextPageUrl;
    const pokemons = await this.fetchUrl(url);
    const pokemonsList = await this.parseRawPokemonData(pokemons.results);

    return pokemonsList;
  }

  public getPokemonByName(pokeName) {
    return null;
  }

  public async getPokemonsSummaryList() {
    const count = await this.getPokemonsCount();
    const pokemons = await this.fetchUrl(
      `${API_URL}/pokemon?limit=${count + 1}`
    );
    return pokemons;
  }

  public async getPokemonByUrl(url) {
    const pokemonRawItem = await this.fetchUrl(url);
    const pokemon = await this.parseRawPokemonItem(pokemonRawItem);
    return pokemon;
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

  private async parseRawPokemonData(rawPokemonResults): Promise<IPokemon[]> {
    let pokemonsList: IPokemon[] = [];

    for (let item of rawPokemonResults) {
      const props = await this.parseRawPokemonItem(item);
      pokemonsList.push({ ...item, ...props });
    }

    return pokemonsList;
  }

  private async parseRawPokemonItem(item) {
    const details = await this.fetchUrl(item.url);
    const abilities: IAbility[] = [];
    details.abilities.map((i) => {
      this.getAbilityInfo(i.ability.url).then((resolvedAbility) => {
        const ability = {
          effect: resolvedAbility.effect,
          id: resolvedAbility.id,
          name: resolvedAbility.name,
          url: resolvedAbility.url,
        };
        abilities.push(ability);
      });
    });
    const props = {
      id: details.id,
      image: `${IMG_URL}/${details.id}.png`,
      abilities: abilities,
    };

    return props;
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
