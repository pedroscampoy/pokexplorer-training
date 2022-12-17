import { Action, createReducer, on } from '@ngrx/store';
import * as fromPokemonActions from '../actions/pokemon.actions'


export const pokemonFeatureKey = 'pokemon';

export interface State {
  pokemons: Array<any>,
  loading: boolean

}

export const initialState: State = {
  pokemons: [],
  loading: true
};

export const reducer = createReducer(
  initialState,
  on(fromPokemonActions.loadPokemonsSuccess, (state, { data }) => ({ ...state, pokemons: data }))
);
