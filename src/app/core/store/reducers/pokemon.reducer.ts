import { Action, createReducer, on } from '@ngrx/store';
import * as fromPokemonActions from '../actions/pokemon.actions'


export const pokemonFeatureKey = 'pokemon';

export interface State {
  pokemons: Array<any>,
  loading: boolean,
  loaded: boolean,
  error: any,
  selectedPokemon: any,

}

export const initialState: State = {
  pokemons: [],
  loading: true,
  loaded: false,
  error: null,
  selectedPokemon: null,
};

export const reducer = createReducer(
  initialState,
  on(fromPokemonActions.loadPokemons, (state) => ({ ...state, loading: true })),
  on(fromPokemonActions.loadPokemonsSuccess, (state, { data }) => ({ ...state, pokemons: data, loading: false, loaded: true })),
  on(fromPokemonActions.loadPokemonsFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: true })),
  on(fromPokemonActions.selectPokemon, (state, { id }) => ({ ...state, selectedPokemon: state.pokemons.find((pokemon) => pokemon.id === id) })),
  on(fromPokemonActions.selectPokemonDetail, (state, { id }) => ({ ...state, selectedPokemon: state.pokemons.find((pokemon) => pokemon.id === id) })),
);
