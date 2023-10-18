import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ICourse } from 'src/app/models/course';

import {
  getCourses,
  getCoursesSuccess,
  getCoursesFailure,
  getCourseById,
  getCourseByIdSuccess,
  getCourseByIdFailure,
  createCourse,
  createCourseSuccess,
  createCourseFailure,
  updateCourse,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFailure,
} from './course.actions';

const courses: ICourse[] = [
  {
    id: 1,
    name: 'name',
    creationDate: new Date(),
    duration: 1,
    description: 'description',
    authors: [],
  },
];

describe('Course Actions', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    store = TestBed.inject(MockStore);
  });

  it('should create getCourses action', () => {
    const params = { category: 'programming' };

    const expectedAction = getCourses({ params });

    expect(expectedAction).toEqual({
      type: '[Course] Get Courses',
      params,
    });
  });

  it('should create getCoursesSuccess action', () => {
    const totalCount = 10;

    const expectedAction = getCoursesSuccess({ courses, totalCount });

    expect(expectedAction).toEqual({
      type: '[Course] Get Courses Success',
      courses,
      totalCount,
    });
  });

  it('should create getCoursesFailure action', () => {
    const error = 'Failed to get courses';

    const expectedAction = getCoursesFailure({ error });

    expect(expectedAction).toEqual({
      type: '[Course] Get Courses Failure',
      error,
    });
  });

  it('should create getCourseById action', () => {
    const id = 1;

    const expectedAction = getCourseById({ id });

    expect(expectedAction).toEqual({
      type: '[Course] Get Course By Id',
      id,
    });
  });

  it('should create getCourseByIdSuccess action', () => {
    const course = courses[0];

    const expectedAction = getCourseByIdSuccess({ course });

    expect(expectedAction).toEqual({
      type: '[Course] Get Course By Id Success',
      course,
    });
  });

  it('should create getCourseByIdFailure action', () => {
    const error = 'Failed to get course by ID';

    const expectedAction = getCourseByIdFailure({ error });

    expect(expectedAction).toEqual({
      type: '[Course] Get Course By Id Failure',
      error,
    });
  });

  it('should create createCourse action', () => {
    const course = courses[0];

    const expectedAction = createCourse({ course });

    expect(expectedAction).toEqual({
      type: '[Course] Create Course',
      course,
    });
  });

  it('should create createCourseSuccess action', () => {
    const course = courses[0];

    const expectedAction = createCourseSuccess({ course });

    expect(expectedAction).toEqual({
      type: '[Course] Create Course Success',
      course,
    });
  });

  it('should create createCourseFailure action', () => {
    const error = 'Failed to create course';

    const expectedAction = createCourseFailure({ error });

    expect(expectedAction).toEqual({
      type: '[Course] Create Course Failure',
      error,
    });
  });

  it('should create updateCourse action', () => {
    const id = courses[0].id;
    const course = courses[0];

    const expectedAction = updateCourse({ id, course });

    expect(expectedAction).toEqual({
      type: '[Course] Update Course',
      id,
      course,
    });
  });

  it('should create updateCourseSuccess action', () => {
    const course = courses[0];

    const expectedAction = updateCourseSuccess({ course });

    expect(expectedAction).toEqual({
      type: '[Course] Update Course Success',
      course,
    });
  });

  it('should create updateCourseFailure action', () => {
    const error = 'Failed to update course';

    const expectedAction = updateCourseFailure({ error });

    expect(expectedAction).toEqual({
      type: '[Course] Update Course Failure',
      error,
    });
  });

  it('should create deleteCourse action', () => {
    const id = courses[0].id;

    const expectedAction = deleteCourse({ id });

    expect(expectedAction).toEqual({
      type: '[Course] Delete Course',
      id,
    });
  });

  it('should create deleteCourseSuccess action', () => {
    const id = courses[0].id;

    const expectedAction = deleteCourseSuccess({ id });

    expect(expectedAction).toEqual({
      type: '[Course] Delete Course Success',
      id,
    });
  });

  it('should create deleteCourseFailure action', () => {
    const error = 'Failed to delete course';

    const expectedAction = deleteCourseFailure({ error });

    expect(expectedAction).toEqual({
      type: '[Course] Delete Course Failure',
      error,
    });
  });
});
