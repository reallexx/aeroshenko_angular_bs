import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUser } from 'src/app/models/user';

import {
  userLogin,
  userLoginSuccess,
  userLoginFailure,
  userGetInfo,
  userGetInfoSuccess,
  userGetInfoFailure,
  userLogout,
} from './user.actions';

const users: IUser[] = [
  {
    id: 1,
    email: 'email',
    password: 'password',
    token: 'token',
    login: 'login',
  },
];

describe('User Actions', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    store = TestBed.inject(MockStore);
  });

  it('should create userLogin action', () => {
    const email = 'test@example.com';
    const password = 'password';

    const expectedAction = userLogin({ email, password });

    expect(expectedAction).toEqual({
      type: '[User] Login',
      email,
      password,
    });
  });

  it('should create userLoginSuccess action', () => {
    const expectedAction = userLoginSuccess({ users });

    expect(expectedAction).toEqual({
      type: '[User] Login Success',
      users,
    });
  });

  it('should create userLoginFailure action', () => {
    const error = 'Invalid credentials';

    const expectedAction = userLoginFailure({ error });

    expect(expectedAction).toEqual({
      type: '[User] Login Failure',
      error,
    });
  });

  it('should create userGetInfo action', () => {
    const expectedAction = userGetInfo();

    expect(expectedAction).toEqual({
      type: '[User] Get Info',
    });
  });

  it('should create userGetInfoSuccess action', () => {
    const expectedAction = userGetInfoSuccess({ users });

    expect(expectedAction).toEqual({
      type: '[User] Get Info Success',
      users,
    });
  });

  it('should create userGetInfoFailure action', () => {
    const error = 'Failed to get user info';

    const expectedAction = userGetInfoFailure({ error });

    expect(expectedAction).toEqual({
      type: '[User] Get Info Failure',
      error,
    });
  });

  it('should create userLogout action', () => {
    const expectedAction = userLogout();

    expect(expectedAction).toEqual({
      type: '[User] Logout',
    });
  });
});
