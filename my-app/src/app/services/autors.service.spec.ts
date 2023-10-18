import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IRequest } from '../models/request';
import { AutorsService } from './autors.service';

describe('AutorsService', () => {
  let autorsService: AutorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutorsService],
    });

    autorsService = TestBed.inject(AutorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to /api/autors with the provided params and observe the full HttpResponse', () => {
    const params = new HttpParams().set('name_like', '0000');
    const responseData = [
      {
        id: 1,
        name: 'Автор Первый',
      },
    ];
    const responseHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    autorsService.getList(params as unknown as IRequest).subscribe((response) => {
      expect(response.body).toEqual(responseData);
      expect(response.headers).toEqual(responseHeaders);
    });

    const httpRequest = httpMock.expectOne(`/api/autors?name_like=0000`);
    expect(httpRequest.request.method).toBe('GET');
    expect(httpRequest.request.params).toEqual(params);

    httpRequest.flush(responseData, { headers: responseHeaders });
  });
});
