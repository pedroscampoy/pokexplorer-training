import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromUserReducer from 'src/app/core/store/reducers/user.reducer'
import * as fromPokemonReducer from 'src/app/core/store/reducers/pokemon.reducer'


export interface AppState {
  //user: fromUserReducer.State,
  pokemon: fromPokemonReducer.State,
}

export const reducers: ActionReducerMap<AppState> = {
  //user: fromUserReducer.reducer,
  pokemon: fromPokemonReducer.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
