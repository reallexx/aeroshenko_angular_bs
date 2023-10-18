import { HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let messageService: MessageService;
  let nextHandler: Subject<HttpEvent<unknown>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorInterceptor, MessageService],
    });

    interceptor = TestBed.inject(ErrorInterceptor);
    messageService = TestBed.inject(MessageService);

    nextHandler = new Subject();
  });

  it('should catch and handle HTTP errors', (done) => {
    const errorMessage = 'Error 404: Not Found';

    spyOn(messageService, 'add');

    interceptor.intercept(new HttpRequest('GET', '/api/data'), { handle: () => nextHandler }).subscribe({
      next: () => {
        fail('The request should have thrown an error');
      },
      error: (error) => {
        expect(error).toEqual(jasmine.any(HttpErrorResponse));
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'Ошибка',
          detail: errorMessage,
        });
        done();
      },
    });

    nextHandler.error(
      new HttpErrorResponse({ error: new ErrorEvent('404', { message: 'Not Found' }), status: 404, statusText: 'Not Found' }),
    );
  });
});
