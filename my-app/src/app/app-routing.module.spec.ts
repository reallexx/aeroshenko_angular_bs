import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fixture;

  const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
    { path: 'login', component: LoginPageComponent },
    { path: '**', component: NotFoundComponent },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [NotFoundComponent, LoginPageComponent, AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('should navigate to courses page for empty path', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/courses');
    });
  }));

  it('should navigate to login page for /login path', fakeAsync(() => {
    router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
    });
  }));

  it('should navigate to not found page for unknown paths', fakeAsync(() => {
    router.navigate(['/unknown']).then(() => {
      expect(location.path()).toBe('/unknown');
    });
  }));
});
