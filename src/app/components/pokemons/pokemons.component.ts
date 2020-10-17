import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import {
  IPokemon,
  IPokemonList,
  IPokemonSummary,
  IPokemonSummaryList,
} from '../../types/interfaces';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemonsPerPage: number = 20;
  pokemons: IPokemon[];
  pokemonsSummaryList: IPokemonSummary[];
  pokemonsFoundList: IPokemon[];
  paginationInfo: IPokemonList;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPokemonsDash(this.pokemonsPerPage).then((data) => {
      this.pokemons = data.results;
      this.paginationInfo = data;
    });
    this.dataService
      .getPokemonsSummaryList()
      .then((data) => (this.pokemonsSummaryList = data.results));
    // this.dataService
    //   .getPokemonsSummaryList(this.pokemonsPerPage)
    //   .then((data) => (this.paginationInfo = data));
  }

  OnFilteredReturn(filteredPokemonsList: IPokemonSummary[]) {
    let pokemonsFound: IPokemon[] = [];
    for (let item of filteredPokemonsList) {
      this.dataService
        .getPokemonByUrl(item.url)
        .then((data) => pokemonsFound.push(data));
    }
    this.pokemonsFoundList = pokemonsFound;
  }

  OnShowMoreClick() {
    this.dataService
      .getPokemonsDash(this.pokemonsPerPage, this.paginationInfo.next)
      .then((data) => {
        this.pokemons = this.pokemons.concat(data.results);
        this.paginationInfo = data;
      });
  }
}
