import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/user';
import * as fromUserActions from '../actions/user.actions';

export const reducerFeatureKey = 'users';

export interface State {
  users: IUser[];
  error: unknown | null;
}

export const initialState: State = {
  users: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(fromUserActions.userLogin, fromUserActions.userGetInfo, fromUserActions.userLogout, (state) => ({ ...state })),
  on(fromUserActions.userLoginSuccess, fromUserActions.userGetInfoSuccess, (state, { users }) => ({ ...state, users })),
  on(fromUserActions.userLoginFailure, fromUserActions.userGetInfoFailure, (state, { error }) => ({ ...state, error })),
);
