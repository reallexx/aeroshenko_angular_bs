import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
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
          map((users) => {
            if (users.length === 0) {
              this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пользователь не найден' });
              return fromUserActions.userLoginFailure({ error: 'User not found' });
            }

            localStorage.setItem('auth_token', users[0].token);
            this.router.navigate(['/courses']);

            return fromUserActions.userLoginSuccess({ users });
          }),
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}
}
