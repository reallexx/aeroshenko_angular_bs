import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { userLogin, userLoginSuccess } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private router: Router, private messageService: MessageService, private store: Store, private actions$: Actions) {}

  login(formData: NgForm) {
    this.actions$.pipe(ofType(userLoginSuccess), take(1)).subscribe((data) => {
      if (data.users.length === 0) {
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пользователь не найден' });
        return;
      }
      localStorage.setItem('auth_token', data.users[0].token);
      this.router.navigate(['/courses']);
    });

    this.store.dispatch(userLogin({ email: formData.value['email'], password: formData.value['password'] }));
  }
}
