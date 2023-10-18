import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as fromUserActions from '../actions/user.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { State } from '..';
import { IUser } from 'src/app/models/user';

describe('UserEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UserEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore<State>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'getUserInfo', 'logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: MessageService, useValue: messageService },
      ],
    });

    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
  });

  describe('userLogin$', () => {
    it('should return userLoginSuccess action if login succeeds', () => {
      const email = 'test@test.com';
      const password = 'password';
      const users: IUser[] = [
        {
          id: 1,
          email: 'email',
          password: 'password',
          token: 'token',
          login: 'login',
        },
      ];
      const action = fromUserActions.userLogin({ email, password });
      const completion = fromUserActions.userLoginSuccess({ users });

      actions$ = of(action);
      const response = of(users);
      authService.login.and.returnValue(response);

      effects.userLogin$.subscribe((result) => {
        expect(result).toEqual(completion);
        expect(router.navigate).toHaveBeenCalledWith(['/courses']);
      });
    });

    it('should return userLoginFailure action and message if user not found', () => {
      const email = 'test@test.com';
      const password = 'password';
      const error = 'User not found';

      const action = fromUserActions.userLogin({ email, password });
      const completion = fromUserActions.userLoginFailure({ error });

      actions$ = of(action);
      const response = of([]);
      authService.login.and.returnValue(response);

      effects.userLogin$.subscribe((result) => {
        expect(result).toEqual(completion);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('should return userLoginFailure action if login fails', () => {
      const email = 'test@test.com';
      const password = 'password';
      const error = 'Error message';
      const action = fromUserActions.userLogin({ email, password });
      const completion = fromUserActions.userLoginFailure({ error });

      actions$ = of(action);
      const response = throwError(() => error);
      authService.login.and.returnValue(response);

      effects.userLogin$.subscribe((result) => {
        expect(result).toEqual(completion);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('userGetInfo$', () => {
    it('should return userGetInfoSuccess action if getUserInfo succeeds', () => {
      const action = fromUserActions.userGetInfo();
      const users: IUser[] = [
        {
          id: 1,
          email: 'email',
          password: 'password',
          token: 'token',
          login: 'login',
        },
      ];
      const completion = fromUserActions.userGetInfoSuccess({ users });

      actions$ = of(action);
      const response = of(users);
      authService.getUserInfo.and.returnValue(response);

      effects.userGetInfo$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });

    it('should return userGetInfoFailure action if getUserInfo fails', () => {
      const action = fromUserActions.userGetInfo();
      const error = 'Error message';
      const completion = fromUserActions.userGetInfoFailure({ error });

      actions$ = of(action);
      const response = throwError(() => error);
      authService.getUserInfo.and.returnValue(response);

      effects.userGetInfo$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('userLogout$', () => {
    it('should call authService.logout() when userLogout action is dispatched', () => {
      const action = fromUserActions.userLogout();

      actions$ = of(action);

      effects.userLogout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalled();
      });
    });
  });
});
