import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userLogin } from 'src/app/store/actions/user.actions';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule],
      providers: [provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch userLogin action on login', () => {
    const email = 'test@example.com';
    const password = 'password';
    const formData = { value: { email, password } } as NgForm;

    const dispatchSpy = spyOn(store, 'dispatch');

    component.login(formData);

    expect(dispatchSpy).toHaveBeenCalledWith(userLogin({ email, password }));
  });
});
