import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { userGetInfo, userLogout } from 'src/app/store/actions/user.actions';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should fetch user info on initialization', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(userGetInfo());
  });

  it('should dispatch logout action and navigate to login page on logout', () => {
    const logoutButton: HTMLButtonElement = fixture.nativeElement.querySelector('p-button');
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    logoutButton.click();

    expect(mockStore.dispatch).toHaveBeenCalledWith(userLogout());
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
