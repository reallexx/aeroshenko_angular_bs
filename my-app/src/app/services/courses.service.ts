import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../models/course';
import { IRequest } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getList(params: IRequest): Observable<HttpResponse<unknown>> {
    return this.httpClient.get<HttpResponse<unknown>>(`/api/courses`, { params, observe: 'response' });
  }

  createItem(course: ICourse): Observable<ICourse> {
    course.id = Math.floor(Math.random() * 10 ** 10);
    return this.httpClient.post<ICourse>(`/api/courses`, course);
  }

  getItemById(id: number): Observable<ICourse> {
    return this.httpClient.get<ICourse>(`/api/courses/${id}`);
  }

  updateItem(id: number, course: ICourse): Observable<ICourse> {
    return this.httpClient.put<ICourse>(`/api/courses/${id}`, course);
  }

  removeItem(id: number) {
    return this.httpClient.delete(`/api/courses/${id}`);
  }
}
