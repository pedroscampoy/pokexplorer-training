import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemonReducer from '../reducers/pokemon.reducer'

export const pokemonStateSelector = createFeatureSelector<fromPokemonReducer.State>('pokemon');

export const pokemonSelector = createSelector(pokemonStateSelector, ((state: fromPokemonReducer.State) => state.pokemons))
