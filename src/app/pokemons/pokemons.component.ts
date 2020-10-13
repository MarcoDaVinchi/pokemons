import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';
import { IPokemon } from '../shared/interfaces';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemon[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPokemons().then((data) => (this.pokemons = data));
    // this.pokemons = [
    //   {
    //     name: 'bulbasaur',
    //     id: 1,
    //     abilities: [
    //       {
    //         name: 'overgrow',
    //         url: 'https://pokeapi.co/api/v2/ability/65/',
    //       },
    //       {
    //         name: 'chlorophyll',
    //         url: 'https://pokeapi.co/api/v2/ability/34/',
    //       },
    //     ],
    //     image: 'https://pokeres.bastionbot.org/images/pokemon/1.png',
    //     url: 'https://pokeapi.co/api/v2/pokemon/1/',
    //   },
    // ];
  }
}
