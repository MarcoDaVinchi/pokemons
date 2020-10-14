import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsModule } from './components/pokemons/pokemons.module';
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PokemonsModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
