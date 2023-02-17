import { Pokemon } from 'src/app/core/models/pokemon.domain';
import { PokemonService } from './../../services/pokemon.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import * as fromPokemonActions from '../actions/pokemon.actions';
import { Action } from '@ngrx/store';



@Injectable()
export class PokemonEffects {


  constructor(private actions$: Actions,
    private pokemonService: PokemonService) {}

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(fromPokemonActions.loadPokemons),
    switchMap((action) => this.loadPokemons())));

    loadPokemons(): Observable<Action> {
      return this.pokemonService.getAllPokemons().pipe(
        map((res) => fromPokemonActions.loadPokemonsSuccess({data: res})),
        catchError((error) => of(fromPokemonActions.loadPokemonsFailure({error})))
      )
    }
}
