import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string): void {
    localStorage.setItem('currentUser', JSON.stringify({ email, password }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return Boolean(currentUser && currentUser.email && currentUser.password);
  }

  getUserInfo(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.email;
  }
}
