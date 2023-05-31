import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SectionComponent } from './components/section/section.component';
import { CourseItemComponent } from './components/course-item/course-item.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LogoComponent, CourseListComponent, BreadcrumbsComponent, SectionComponent, CourseItemComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
