import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isLoggedIn', () => {
    it('should call authService.isAuthenticated', () => {
      component.isLoggedIn;
      expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    });

    it('should return false if authService.isAuthenticated returns false', () => {
      mockAuthService.isAuthenticated.and.returnValue(false);
      expect(component.isLoggedIn).toBe(false);
    });

    it('should return true if authService.isAuthenticated returns true', () => {
      mockAuthService.isAuthenticated.and.returnValue(true);
      expect(component.isLoggedIn).toBe(true);
    });
  });
});
