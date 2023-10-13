import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './reducers/user.reducers';
import * as fromCourse from './reducers/course.reducers';
import * as fromRouter from '@ngrx/router-store';

export const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState>('router');

export const { selectRouteParam } = fromRouter.getSelectors(selectRouterState);

export interface State {
  [fromUser.reducerFeatureKey]: fromUser.State;
  [fromCourse.reducerFeatureKey]: fromCourse.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.reducerFeatureKey]: fromUser.reducer,
  [fromCourse.reducerFeatureKey]: fromCourse.reducer,
  router: fromRouter.routerReducer,
};
