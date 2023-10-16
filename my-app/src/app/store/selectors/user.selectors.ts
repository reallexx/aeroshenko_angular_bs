import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducers';

export const selectUsersState = createFeatureSelector<fromUser.State>(fromUser.reducerFeatureKey);

export const selectUsers = createSelector(selectUsersState, (state) => state.users);
