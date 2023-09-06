import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  get valid() {
    return this.email.length > 0 && this.password.length > 0;
  }

  login() {
    if (this.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data.length === 0) {
            errorHandler('Пользователь не найден');
            return;
          }
          localStorage.setItem('auth_token', data[0].token);
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          errorHandler(error.statusText || error);
        },
      });

      const errorHandler = (error: string) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: error,
          life: 3000,
        });
      };
    }
  }
}
