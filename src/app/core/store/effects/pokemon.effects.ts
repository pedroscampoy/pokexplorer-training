import { Pokemon } from 'src/app/core/models/pokemon.domain';
import { PokemonService } from './../../services/pokemon.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import * as fromPokemonActions from '../actions/pokemon.actions';
import { Action, Store } from '@ngrx/store';
import { pokemonSelected } from 'src/app/core/store/selectors/pokemon.selectors';



@Injectable()
export class PokemonEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private pokemonService: PokemonService) {}

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(fromPokemonActions.loadPokemons),
    switchMap((action) => this.loadPokemons(action))));

    loadPokemons(action: any): Observable<Action> {
      return this.pokemonService.getAllPokemons(action.limit, action.offset).pipe(
        map((res) => fromPokemonActions.loadPokemonsSuccess({data: res})),
        catchError((error) => of(fromPokemonActions.loadPokemonsFailure({error})))
      )
    }

  //reacting on pokemonSelected selector
  selectedIdChanged = createEffect(() => {
    return this.store.select(pokemonSelected)
    // .pipe(
    //   switchMap((res) => of(res)),
    // )
    .pipe(
      //map(res => res),
      tap((res) => console.log(res))
    )
  }, {dispatch: false})

  //TODO Several actions trigger the effect
  // loadCustomers = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(
  //       CustomersPageActions.loaded,
  //       CustomersPageActions.refreshClicked,
  //     ),
  //     switchMap((_) => {
  //       ...
  //     }),
  //   )
  // })

  //TODO WithLatestFrom
}
