import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/models/user';

export const userLogin = createAction('[User] Login', props<{ email: string; password: string }>());

export const userLoginSuccess = createAction('[User] Login Success', props<{ users: IUser[] }>());

export const userLoginFailure = createAction('[User] Login Failure', props<{ error: unknown }>());

export const userGetInfo = createAction('[User] Get Info');

export const userGetInfoSuccess = createAction('[User] Get Info Success', props<{ users: IUser[] }>());

export const userGetInfoFailure = createAction('[User] Get Info Failure', props<{ error: unknown }>());

export const userLogout = createAction('[User] Logout');
