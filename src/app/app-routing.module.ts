import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';

const routes: Routes = [{
  path: '',
  component: PokemonDisplayComponent,
}, {
  path: 'login',
  component: LoginComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
