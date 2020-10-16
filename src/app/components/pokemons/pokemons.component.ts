import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { IPokemon, IPokemonSummary } from '../../types/interfaces';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemon[];
  pokemonsSummaryList: IPokemonSummary[];
  pokemonsFoundList: IPokemon[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPokemonsDash().then((data) => (this.pokemons = data));
    this.dataService
      .getPokemonsSummaryList()
      .then((data) => (this.pokemonsSummaryList = data.results));
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
}
