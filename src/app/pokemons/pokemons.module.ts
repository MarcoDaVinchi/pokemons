import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';

@NgModule({
  declarations: [PokemonsComponent, PokemonsListComponent],
  imports: [CommonModule, PokemonsRoutingModule],
  exports: [PokemonsComponent],
})
export class PokemonsModule {}
