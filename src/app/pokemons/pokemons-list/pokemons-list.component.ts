import { Component, OnInit, Input } from '@angular/core';
import { IPokemon } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {

  private _pokemons: IPokemon[] = [];
  @Input() get pokemons(): IPokemon[]{
    return this._pokemons;
  }

  set pokemons(value: IPokemon[]) {
    if (value) {
      this._pokemons = value;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
