import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AuthorsComponent } from 'src/app/shared/components/authors/authors.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { SectionComponent } from './components/section/section.component';
import { CoursesComponent } from './courses.component';
import { CourseBorderDirective } from './directives/course-border.directive';

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ButtonModule,
  InputTextModule,
  ConfirmDialogModule,
  DialogModule,
  InputTextareaModule,
  InputNumberModule,
  CalendarModule,
];

const standaloneComponents = [AuthorsComponent];

const components = [CourseListComponent, CourseItemComponent, SectionComponent, CourseEditComponent];

const directives = [CourseBorderDirective];

const pipes = [DurationPipe, OrderByPipe, FilterPipe];

@NgModule({
  declarations: [CoursesComponent, ...components, ...directives, CourseEditComponent],
  imports: [...modules, ...pipes, ...standaloneComponents],
  exports: [CoursesComponent],
  providers: [ConfirmationService],
})
export class CoursesModule {}
