import * as fromRouter from '@ngrx/router-store';
import { IUser } from 'src/app/models/user';
import { State } from '..';
import * as fromCourse from '../reducers/course.reducers';
import * as fromUserSelectors from './user.selectors';

describe('UserSelectors', () => {
  const users: IUser[] = [
    {
      id: 1,
      email: 'email',
      password: 'password',
      token: 'token',
      login: 'login',
    },
  ];
  const state: State = {
    users: {
      users,
      error: null,
    },
    courses: {} as fromCourse.State,
    router: {} as fromRouter.RouterReducerState,
  };

  it('should select users state', () => {
    expect(fromUserSelectors.selectUsersState(state)).toEqual(state.users);
  });

  it('should select users', () => {
    expect(fromUserSelectors.selectUsers.projector(state.users)).toEqual(users);
  });
});
