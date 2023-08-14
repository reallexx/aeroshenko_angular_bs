import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './login-page.component';

const modules = [CommonModule, FormsModule, ButtonModule, InputTextModule, CardModule];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [...modules],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
