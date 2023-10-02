import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequest } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class AutorsService {
  constructor(private httpClient: HttpClient) {}

  getList(params: IRequest): Observable<HttpResponse<unknown>> {
    return this.httpClient.get<HttpResponse<unknown>>(`/api/autors`, { params, observe: 'response' });
  }
}
