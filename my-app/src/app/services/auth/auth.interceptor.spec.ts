import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header to requests except /users', () => {
    const authToken = 'dummyToken';
    localStorage.setItem('auth_token', authToken);

    const data = { id: 1, name: 'John Doe' };
    const url = '/api/data';
    const request = http.get(url).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const httpRequest = httpMock.expectOne(url);
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${authToken}`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();

    httpRequest.flush(data);
    request.unsubscribe();
  });

  it('should not add Authorization header to /users requests', () => {
    const data = { id: 1, name: 'John Doe' };
    const url = '/api/users';
    const request = http.get(url).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const httpRequest = httpMock.expectOne(url);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();

    httpRequest.flush(data);
    request.unsubscribe();
  });
});
