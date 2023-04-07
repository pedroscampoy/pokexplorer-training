import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/core/models/pokemon.domain';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons',
  //props<{ offset: number, limit: number }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ data: any }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: any }>()
);

export const selectPokemon = createAction(
  '[Pokemon Display] Select Pokemons',
  props<{ id: number }>()
);

export const selectPokemonDetail = createAction(
  '[Pokemon Detail] Select Pokemons',
  props<{ id: number }>()
);

export const setPokemonOffset = createAction(
  '[Pokemon] Set Pokemon Offset',
  props<{ offset: number }>()
);

export const setPokemonLimit = createAction(
  '[Pokemon] Set Pokemon Limit',
  props<{ limit: number }>()
);

export const loadPreviousPokemons = createAction(
  '[Pokemon] Load Previous Pokemons',
  props<{ time: string }>()
);

export const loadPreviousPokemonsSuccess = createAction(
  '[Pokemon] Load Previous Pokemons Success',
  props<{ data: any, time: string }>()
);

export const loadPreviousPokemonsFailure = createAction(
  '[Pokemon] Load Previous Pokemons Failure',
  props<{ error: any }>()
);

export const loadNextPokemons = createAction(
  '[Pokemon] Load Next Pokemons',
  props<{ time: string }>()
);

export const loadNextPokemonsSuccess = createAction(
  '[Pokemon] Load Next Pokemons Success',
  props<{ data: any, time: string }>()
);

export const loadNextPokemonsFailure = createAction(
  '[Pokemon] Load Next Pokemons Failure',
  props<{ error: any }>()
);
