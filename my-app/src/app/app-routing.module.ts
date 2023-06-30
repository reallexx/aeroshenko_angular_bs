import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/courses/courses.module').then((m) => m.CoursesModule),
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*{ enableTracing: true }*/)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
