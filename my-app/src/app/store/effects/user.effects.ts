import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as fromUserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.userLogin),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((users) => fromUserActions.userLoginSuccess({ users })),
          catchError((error) => of(fromUserActions.userLoginFailure({ error }))),
        ),
      ),
    ),
  );

  userGetInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.userGetInfo),
      switchMap(() =>
        this.authService.getUserInfo().pipe(
          map((users) => fromUserActions.userGetInfoSuccess({ users })),
          catchError((error) => of(fromUserActions.userGetInfoFailure({ error }))),
        ),
      ),
    ),
  );

  public userLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUserActions.userLogout),
        tap(() => this.authService.logout()),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
