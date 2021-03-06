import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { QueryTextboxComponent } from './pokemons-list/query-textbox/query-textbox.component';
import { ImgFallbackDirective } from './img-fallback.directive';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [PokemonsComponent, PokemonsListComponent, QueryTextboxComponent, ImgFallbackDirective, ModalComponent],
  imports: [CommonModule, PokemonsRoutingModule, FormsModule ],
  exports: [PokemonsComponent],
})
export class PokemonsModule {}
