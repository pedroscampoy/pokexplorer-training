import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokemonFilterComponent } from './components/pokemon-filter/pokemon-filter.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDisplayComponent,
    PokemonSearchComponent,
    PokemonFilterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
