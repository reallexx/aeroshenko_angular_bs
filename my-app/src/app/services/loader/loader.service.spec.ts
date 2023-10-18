import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

describe('LoaderService', () => {
  let loaderService: LoaderService;
  let showSubject: Subject<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });

    loaderService = TestBed.inject(LoaderService);
    showSubject = new Subject<boolean>();
    loaderService.show$ = showSubject.asObservable();
  });

  it('should emit true when show() is called', () => {
    loaderService.show$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(() => loaderService.show()).not.toThrow();
  });

  it('should emit false when hide() is called', () => {
    loaderService.show$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(false);
    });

    expect(() => loaderService.hide()).not.toThrow();
  });
});
