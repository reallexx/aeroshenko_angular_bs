import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/services/auth,guard';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: CourseListComponent },
      { path: 'new', component: CourseEditComponent },
      { path: ':id', component: CourseEditComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
