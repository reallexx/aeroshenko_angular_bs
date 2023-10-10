import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnDestroy {
  subscriptions = new Subscription();

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  login(formData: NgForm) {
    this.subscriptions.add(
      this.authService.login(formData.value['email'], formData.value['password']).subscribe({
        next: (data) => {
          if (data.length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пользователь не найден' });
            return;
          }
          localStorage.setItem('auth_token', data[0].token);
          this.router.navigate(['/courses']);
        },
      }),
    );
  }
}
