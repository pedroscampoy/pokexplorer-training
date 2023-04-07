import { setPokemonLimit } from './../actions/pokemon.actions';
import {
  pokemonOffset,
  pokemonLimit,
  pokemonLoaded,
} from './../selectors/pokemon.selectors';
import { Pokemon } from 'src/app/core/models/pokemon.domain';
import { PokemonService } from './../../services/pokemon.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import * as fromPokemonActions from '../actions/pokemon.actions';
import { Action, Store } from '@ngrx/store';
import { pokemonSelected } from 'src/app/core/store/selectors/pokemon.selectors';

@Injectable()
export class PokemonEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPokemonActions.loadPokemons
      ),
      withLatestFrom(
        this.store.select(pokemonOffset),
        this.store.select(pokemonLimit)
      ),
      switchMap(([action, offset, limit]) =>
        this.pokemonService.getAllPokemons(limit, offset).pipe(
          map((res) => fromPokemonActions.loadPokemonsSuccess({ data: res })),
          catchError((error) =>
            of(fromPokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    )
  );

  loadFirstPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPokemonActions.loadPokemonsSuccess),
      switchMap(() =>
        of(
          fromPokemonActions.loadPreviousPokemons({ time: 'first' }),
          fromPokemonActions.loadNextPokemons({ time: 'first' })
        )
      )
    )
  );

  prefetchNextPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPokemonActions.loadNextPokemons),
      withLatestFrom(
        this.store.select(pokemonOffset),
        this.store.select(pokemonLimit)
      ),
      switchMap(([action, offset, limit]) =>
        this.pokemonService.getAllPokemons(limit, offset + limit).pipe(
          map((res) =>
            fromPokemonActions.loadNextPokemonsSuccess({
              data: res,
              time: action.time,
            })
          ),
          catchError((error) =>
            of(fromPokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    )
  );

  prefetchPreviousPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPokemonActions.loadPreviousPokemons),
      withLatestFrom(
        this.store.select(pokemonOffset),
        this.store.select(pokemonLimit)
      ),
      switchMap(([action, offset, limit]) =>
        this.pokemonService.getAllPokemons(limit, offset - limit).pipe(
          map((res) =>
            fromPokemonActions.loadPreviousPokemonsSuccess({
              data: res,
              time: action.time,
            })
          ),
          catchError((error) =>
            of(fromPokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    )
  );

  //reacting on pokemonSelected selector
  selectedIdChanged = createEffect(
    () => {
      return (
        this.store
          .select(pokemonSelected)
          // .pipe(
          //   switchMap((res) => of(res)),
          // )
          .pipe(
            //map(res => res),
            tap((res) => console.log(res))
          )
      );
    },
    { dispatch: false }
  );

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
