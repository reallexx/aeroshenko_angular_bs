import { IUser } from 'src/app/models/user';
import * as fromUserActions from '../actions/user.actions';
import { initialState, reducer } from './user.reducers';

describe('User Reducer', () => {
  const users: IUser[] = [
    {
      id: 1,
      email: 'email',
      password: 'password',
      token: 'token',
      login: 'login',
    },
  ];

  it('should return the initial state', () => {
    const action = {} as never;
    const state = reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle userLogin, userGetInfo, userLogout actions', () => {
    const action = fromUserActions.userLogin({ email: users[0].email, password: users[0].password });
    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle userLoginSuccess, userGetInfoSuccess actions', () => {
    const action = fromUserActions.userLoginSuccess({ users });
    const state = reducer(initialState, action);

    expect(state.users).toEqual(users);
    expect(state.error).toBeNull();
  });

  it('should handle userLoginFailure, userGetInfoFailure actions', () => {
    const error = 'User not found';
    const action = fromUserActions.userLoginFailure({ error });
    const state = reducer(initialState, action);

    expect(state.users).toEqual([]);
    expect(state.error).toEqual(error);
  });
});
