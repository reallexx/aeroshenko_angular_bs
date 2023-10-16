import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { EventService } from './services/event.service';
import { LoaderInterceptor } from './services/loader/loader.interceptor';
import { reducers } from './store';
import { CourseEffects } from './store/effects/course.effects';
import { UserEffects } from './store/effects/user.effects';

registerLocaleData(localeRu);

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  CoreModule,
  LoginPageModule,
  AppRoutingModule,
  ToastModule,
];

const store = [
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([UserEffects, CourseEffects]),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  StoreRouterConnectingModule.forRoot(),
];

@NgModule({
  declarations: [AppComponent],
  imports: [...modules, ...store],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    MessageService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
