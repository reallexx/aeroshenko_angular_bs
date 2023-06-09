import { Component, EventEmitter, Output } from '@angular/core';
import { ILogin } from 'src/app/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @Output() login = new EventEmitter<ILogin>();

  email = '';
  password = '';

  get valid() {
    return this.email.length > 0 && this.password.length > 0;
  }

  submit() {
    this.login.emit({ email: this.email, password: this.password });
  }
}
