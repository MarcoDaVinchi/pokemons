import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { QueryTextboxComponent } from './pokemons-list/query-textbox/query-textbox.component';
import { ModalModule } from '../modal';

@NgModule({
  declarations: [PokemonsComponent, PokemonsListComponent, QueryTextboxComponent],
  imports: [CommonModule, PokemonsRoutingModule, FormsModule, ModalModule],
  exports: [PokemonsComponent],
})
export class PokemonsModule {}
