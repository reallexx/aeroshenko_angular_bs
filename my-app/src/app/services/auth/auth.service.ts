import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`/api/users?email=${email}&password=${password}`);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('auth_token'));
  }

  getUserInfo(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`/api/users?token=${localStorage.getItem('auth_token')}`);
  }
}
