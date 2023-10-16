import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userLogin } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private store: Store) {}

  login(formData: NgForm) {
    this.store.dispatch(userLogin({ email: formData.value['email'], password: formData.value['password'] }));
  }
}
