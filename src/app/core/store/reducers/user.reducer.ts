import { Action, createReducer, on } from '@ngrx/store';
import * as fromUserAction from 'src/app/core/store/actions/users.actions'


export const userFeatureKey = 'user';

export interface State {
  user: {user: string, pass: string},
  logged: boolean

}

export const initialState: State = {
  user: {user: '', pass: ''},
  logged: false

};

export const reducer = createReducer(
  initialState,

);
