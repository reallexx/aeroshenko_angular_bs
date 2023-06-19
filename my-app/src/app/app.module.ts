import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LoginPageModule } from './modules/login-page/login-page.module';

registerLocaleData(localeRu);

const modules = [CommonModule, CoreModule, CoursesModule, LoginPageModule];

@NgModule({
  declarations: [AppComponent],
  imports: [...modules],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
