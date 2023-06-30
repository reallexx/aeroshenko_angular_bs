import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  get valid() {
    return this.email.length > 0 && this.password.length > 0;
  }

  login() {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/courses']);
  }
}
