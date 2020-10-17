import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {
  IPokemon,
  IAbility,
  IPokemonSummaryList,
  IPokemonList,
} from '../types/interfaces';

const API_URL: string = environment.pokeApiURL;
const IMG_URL: string = environment.pokeApiImgURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  public async getPokemonsDash(
    nextPageUrl: string = '',
    limit: number = 20
  ): Promise<IPokemonList> {
    let url: string =
      nextPageUrl === '' ? `${API_URL}/pokemon?limit=${limit}` : nextPageUrl;
    const pokemons: IPokemonSummaryList = await this.fetchUrl(url);
    const parsedPokemonsList = await this.parseRawPokemonData(pokemons.results);
    let pokemonsList: IPokemonList = {
      count: pokemons.count,
      next: pokemons.next,
      previous: pokemons.previous,
      results: parsedPokemonsList,
    };

    return pokemonsList;
  }

  public getPokemonByName(pokeName) {
    return null;
  }

  public async getPokemonsSummaryList(
    amount: number = 0
  ): Promise<IPokemonSummaryList> {
    const count = await this.getPokemonsCount();
    const limit: string = amount === 0 ? count + 1 : amount;
    const pokemons: IPokemonSummaryList = await this.fetchUrl(
      `${API_URL}/pokemon?limit=${limit}`
    );
    return pokemons;
  }

  public async getPokemonByUrl(url) {
    const pokemonRawItem = await this.fetchUrl(url);
    const pokemon = await this.parseRawPokemonItem(pokemonRawItem, url);
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
      const details = await this.fetchUrl(item.url);
      const props = await this.parseRawPokemonItem(details, item.url);
      pokemonsList.push({ ...props });
    }

    return pokemonsList;
  }

  private async parseRawPokemonItem(details, pokeUrl): Promise<IPokemon> {
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
      name: details.name,
      image: `${IMG_URL}/${details.id}.png`,
      abilities: abilities,
      url: pokeUrl,
    };

    return { ...props };
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
