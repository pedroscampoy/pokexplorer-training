import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemonReducer from '../reducers/pokemon.reducer';

export const pokemonStateSelector =
  createFeatureSelector<fromPokemonReducer.State>('pokemon');

export const pokemonSelector = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.pokemons
);
export const pokemonSelected = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.selectedPokemon
);
export const pokemonLoading = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.loading
);
export const pokemonLoaded = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.loaded
);
export const pokemonError = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.error
);
export const pokemonOffset = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.offset
);
export const pokemonLimit = createSelector(
  pokemonStateSelector,
  (state: fromPokemonReducer.State) => state.limit
);

export const isBackButtonEnabled = createSelector(
  pokemonOffset,
  pokemonLimit,
  (offset, limit) => offset - limit < 0
);

export const pokemonDisplaySelector = createSelector(
  pokemonLimit,
  pokemonSelector,
  (limit, pokemonList) => pokemonList.slice(limit, limit * 2)
);
