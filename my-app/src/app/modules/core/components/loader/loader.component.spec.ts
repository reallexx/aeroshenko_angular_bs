import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let loaderElement: HTMLElement;

  beforeEach(async () => {
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['show$']);

    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: mockLoaderService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('should show the loader when loaderService.show$ emits true', () => {
    mockLoaderService.show$ = of(true);

    // Subscribe to the show$ observable to make an assertion
    mockLoaderService.show$.subscribe((show) => {
      expect(show).toBe(true);

      fixture.detectChanges();
      loaderElement = fixture.debugElement.query(By.css('.loader'))?.nativeElement;
      expect(loaderElement).toBeTruthy();
    });
  });

  it('should hide the loader when loaderService.show$ emits false', () => {
    mockLoaderService.show$ = of(false);

    // Subscribe to the show$ observable to make an assertion
    mockLoaderService.show$.subscribe((show) => {
      expect(show).toBe(false);

      fixture.detectChanges();
      loaderElement = fixture.debugElement.query(By.css('.loader'))?.nativeElement;
      expect(loaderElement).toBeFalsy();
    });
  });
});
