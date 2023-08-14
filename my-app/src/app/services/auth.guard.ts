import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivate: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated() || inject(Router).parseUrl('/login');
};
