import { createAction, props } from '@ngrx/store';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
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
