import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';

describe('LoaderInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderInterceptor,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loaderService = TestBed.inject(LoaderService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show and hide loader for requests except /autors', () => {
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    const dummyResponse = { data: 'dummy' };

    httpClient.get('/api/data').subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);

    expect(loaderService.show).toHaveBeenCalled();
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('should not show loader for /autors requests', () => {
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    const dummyResponse = { data: 'dummy' };

    httpClient.get('/autors').subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('/autors');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);

    expect(loaderService.show).not.toHaveBeenCalled();
    expect(loaderService.hide).not.toHaveBeenCalled();
  });
});
