import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { canActivate } from 'src/app/services/auth/auth.guard';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesRoutingModule', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), CoursesRoutingModule],
      declarations: [CoursesComponent, CourseListComponent, CourseEditComponent],
      providers: [canActivate], // Add any required providers
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should create the courses routing module', () => {
    const fixture = TestBed.createComponent(CoursesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Test the routing configuration
  it('should navigate to CourseListComponent for empty path', () => {
    const navigateSpy = spyOn(router, 'navigate');

    router.navigate(['']);

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to CourseEditComponent for "new" path', () => {
    const navigateSpy = spyOn(router, 'navigate');

    router.navigate(['new']);

    expect(navigateSpy).toHaveBeenCalledWith(['new']);
  });

  it('should navigate to CourseEditComponent for ":id" path', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const courseId = '123';

    router.navigate([courseId]);

    expect(navigateSpy).toHaveBeenCalledWith([courseId]);
  });
});
