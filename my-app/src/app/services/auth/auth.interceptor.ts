import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    if (req.url.includes('/users')) {
      return next.handle(req);
    }

    const authToken = localStorage.getItem('auth_token');
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    return next.handle(authReq);
  }
}
