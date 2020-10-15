import { Component, OnInit, Input } from '@angular/core';
import { IPokemon } from '../../../types/interfaces';
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

  filteredPokemons: IPokemon[] = [];
  currentSelectedPokemon: IPokemon;
  isModalDialogVisible: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  filter(data: string) {
    if (data) {
      this.filteredPokemons = this.pokemons.filter((pokemon: IPokemon) => {
        return pokemon.name.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  openModal(pokemon: IPokemon) {
    this.isModalDialogVisible = true;
    this.currentSelectedPokemon = pokemon;
  }

  closeModal(isConfirmed: boolean) {
    this.isModalDialogVisible = isConfirmed;
  }
}
