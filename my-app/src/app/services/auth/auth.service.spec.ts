import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IUser } from 'src/app/models/user';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to login with the provided email and password', () => {
    const email = 'test@example.com';
    const password = 'password';
    const userData: IUser[] = [{ id: 1, email: 'email@example.com', password: 'password', token: 'token', login: 'login' }];

    authService.login(email, password).subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const httpRequest = httpMock.expectOne(`/api/users?email=${email}&password=${password}`);
    expect(httpRequest.request.method).toBe('GET');

    httpRequest.flush(userData);
  });

  it('should remove auth_token from localStorage on logout', () => {
    spyOn(localStorage, 'removeItem');

    authService.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
  });

  it('should return true if auth_token exists in localStorage', () => {
    localStorage.setItem('auth_token', 'dummyToken');

    const isAuthenticated = authService.isAuthenticated();

    expect(isAuthenticated).toBeTrue();
  });

  it('should make a GET request to getUserInfo with the auth_token from localStorage', () => {
    const userData: IUser[] = [{ id: 1, email: 'email@example.com', password: 'password', token: 'token', login: 'login' }];
    localStorage.setItem('auth_token', 'dummyToken');

    authService.getUserInfo().subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const httpRequest = httpMock.expectOne(`/api/users?token=dummyToken`);
    expect(httpRequest.request.method).toBe('GET');

    httpRequest.flush(userData);
  });
});
