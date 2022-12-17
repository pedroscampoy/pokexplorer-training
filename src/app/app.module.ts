import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokemonFilterComponent } from './components/pokemon-filter/pokemon-filter.component';
import { HomeComponent } from './components/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AppStoreModule } from 'src/app/core/store/app-store.module';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDisplayComponent,
    PokemonSearchComponent,
    PokemonFilterComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppStoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
