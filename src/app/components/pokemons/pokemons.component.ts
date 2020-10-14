import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { IPokemon } from '../../types/interfaces';

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
  }
}