import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from '../models/course';
import { IRequest } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getList(params: IRequest) {
    return this.httpClient.get(`/api/courses`, { params, observe: 'response' });
  }

  createItem(course: ICourse) {
    course.id = Math.floor(Math.random() * 10 ** 10);
    return this.httpClient.post<ICourse>(`/api/courses`, course);
  }

  getItemById(id: number) {
    return this.httpClient.get<ICourse>(`/api/courses/${id}`);
  }

  updateItem(id: number, course: ICourse) {
    return this.httpClient.put<ICourse>(`/api/courses/${id}`, course);
  }

  removeItem(id: number) {
    return this.httpClient.delete(`/api/courses/${id}`);
  }
}
