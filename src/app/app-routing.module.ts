import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonDisplayComponent,
  },
  {
    path: 'details/:id',
    component: PokemonDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: PokemonDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
