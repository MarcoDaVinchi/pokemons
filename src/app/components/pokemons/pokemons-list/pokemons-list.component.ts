import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPokemon, IPokemonSummary } from '../../../types/interfaces';
import { ModalService } from '../../modal';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {
  private _pokemons: IPokemon[] = [];
  @Input() get pokemons(): IPokemon[] {
    return this._pokemons;
  }

  set pokemons(value: IPokemon[]) {
    if (value) {
      this.filteredPokemons = this._pokemons = value;
    }
  }

  private _pokemonsSummaryList: IPokemonSummary[] = [];
  @Input() get pokemonsSummaryList(): IPokemonSummary[] {
    return this._pokemonsSummaryList;
  }

  set pokemonsSummaryList(value: IPokemonSummary[]) {
    if (value) {
      this._pokemonsSummaryList = value;
    }
  }

  private _pokemonsFoundList: IPokemon[] = [];

  @Input() get pokemonsFoundList(): IPokemon[] {
    return this._pokemonsFoundList;
  }

  set pokemonsFoundList(value: IPokemon[]) {
    if (value) {
      this._pokemonsFoundList = this.filteredPokemons = value;
    }
  }

  @Output() returnFiltered: EventEmitter<
    IPokemonSummary[]
    > = new EventEmitter();
  
  @Output() showMore: EventEmitter<any> = new EventEmitter();

  filteredPokemons: IPokemon[] = [];
  currentSelectedPokemon: IPokemon;
  isModalDialogVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  filter(data: string) {
    if (data) {
      const filteredPokemonsList = this.pokemonsSummaryList.filter(
        (pokemon: IPokemonSummary) => {
          return pokemon.name.toLowerCase().indexOf(data.toLowerCase()) > -1;
        }
      );
      this.returnFiltered.emit(filteredPokemonsList);
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  showMorePokemons() {
    this.showMore.emit();
  }

  openModal(pokemon: IPokemon) {
    this.isModalDialogVisible = true;
    this.currentSelectedPokemon = pokemon;
  }

  closeModal(isConfirmed: boolean) {
    this.isModalDialogVisible = isConfirmed;
  }
}
