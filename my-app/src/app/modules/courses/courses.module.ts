import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { SectionComponent } from './components/section/section.component';
import { CoursesComponent } from './courses.component';
import { CourseBorderDirective } from './directives/course-border.directive';

const modules = [CommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, ButtonModule, InputTextModule, ConfirmDialogModule];

const components = [CourseListComponent, CourseItemComponent, SectionComponent];

const directives = [CourseBorderDirective];

const pipes = [DurationPipe, OrderByPipe, FilterPipe];

@NgModule({
  declarations: [CoursesComponent, ...components, ...directives],
  imports: [...modules, ...pipes],
  exports: [CoursesComponent],
  providers: [ConfirmationService],
})
export class CoursesModule {}
