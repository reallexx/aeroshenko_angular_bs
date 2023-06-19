import { Component } from '@angular/core';
import { ILogin } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app';

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  login(event: ILogin) {
    this.authService.login(event.email, event.password);
    console.log('Выполнен вход в систему');
  }
}
