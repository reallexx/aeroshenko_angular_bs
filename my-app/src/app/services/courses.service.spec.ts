import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { ICourse } from '../models/course';
import { IRequest } from '../models/request';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const courseData: ICourse = {
    name: 'name',
    description: 'description',
    duration: 1,
    creationDate: new Date(),
    topRated: true,
    authors: [1, 2],
    id: 1,
  };

  it('should make a GET request to /api/courses with the provided params and observe the full HttpResponse', () => {
    const params: IRequest = {
      id: 1,
    };
    const responseData = [courseData];

    service.getList(params).subscribe((response) => {
      expect(response.body).toEqual(responseData);
    });

    const httpRequest = httpTestingController.expectOne(`/api/courses?id=1`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(responseData);
  });

  it('should make a POST request to /api/courses with the provided course data', () => {
    const course: ICourse = {
      ...courseData,
    };

    service.createItem(course).subscribe((response) => {
      expect(response).toEqual(course);
    });

    const httpRequest = httpTestingController.expectOne(`/api/courses`);
    expect(httpRequest.request.method).toBe('POST');
    expect(httpRequest.request.body).toEqual({ ...course, id: jasmine.any(Number) });
    httpRequest.flush(course);
  });

  it('should make a GET request to /api/courses/{id} and return the course with the provided ID', () => {
    const courseId = 1;
    const course: ICourse = { ...courseData, id: courseId };

    service.getItemById(courseId).subscribe((response) => {
      expect(response).toEqual(course);
    });

    const httpRequest = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(course);
  });

  it('should make a PUT request to /api/courses/{id} with the provided course data', () => {
    const courseId = 1;
    const course: ICourse = { ...courseData, id: courseId };

    service.updateItem(courseId, course).subscribe((response) => {
      expect(response).toEqual(course);
    });

    const httpRequest = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(httpRequest.request.method).toBe('PUT');
    expect(httpRequest.request.body).toEqual(course);
    httpRequest.flush(course);
  });

  it('should make a DELETE request to /api/courses/{id}', () => {
    const courseId = 1;

    service.removeItem(courseId).subscribe();

    const httpRequest = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(httpRequest.request.method).toBe('DELETE');
    httpRequest.flush(null);
  });
});
