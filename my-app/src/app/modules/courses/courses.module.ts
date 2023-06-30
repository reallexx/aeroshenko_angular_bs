import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { AuthorsComponent } from 'src/app/shared/components/authors/authors.component';
import { BreadcrumbsComponent } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { SectionComponent } from './components/section/section.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseBorderDirective } from './directives/course-border.directive';

const modules = [
  CommonModule,
  FormsModule,
  ButtonModule,
  InputTextModule,
  ConfirmDialogModule,
  DialogModule,
  InputTextareaModule,
  InputNumberModule,
  CalendarModule,
  CoursesRoutingModule,
];

const standaloneComponents = [AuthorsComponent, BreadcrumbsComponent];

const components = [CourseListComponent, CourseItemComponent, SectionComponent, CourseEditComponent];

const directives = [CourseBorderDirective];

const pipes = [DurationPipe, OrderByPipe, FilterPipe];

@NgModule({
  declarations: [CoursesComponent, ...components, ...directives],
  imports: [...modules, ...pipes, ...standaloneComponents],
  exports: [CoursesComponent],
  providers: [ConfirmationService, BreadcrumbsService],
})
export class CoursesModule {}
