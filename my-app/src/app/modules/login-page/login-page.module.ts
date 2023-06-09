import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './login-page.component';
import { CardModule } from 'primeng/card';

const modules = [CommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, ButtonModule, InputTextModule, CardModule];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [...modules],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
