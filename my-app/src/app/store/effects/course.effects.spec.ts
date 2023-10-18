import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { ICourse } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses.service';
import { EventService } from 'src/app/services/event.service';
import * as fromCourseActions from '../actions/course.actions';
import { CourseEffects } from './course.effects';

describe('CourseEffects', () => {
  let actions$: Observable<Action>;
  let effects: CourseEffects;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let router: jasmine.SpyObj<Router>;
  let eventService: jasmine.SpyObj<EventService>;
  let courses: ICourse[];

  beforeEach(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['getList', 'getItemById', 'createItem', 'updateItem', 'removeItem']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    eventService = jasmine.createSpyObj('EventService', ['clearFiltersEvent']);

    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CoursesService, useValue: coursesService },
        { provide: Router, useValue: router },
        { provide: EventService, useValue: eventService },
      ],
    });

    effects = TestBed.inject(CourseEffects);

    courses = [
      {
        id: 1,
        name: 'name',
        creationDate: new Date(),
        duration: 1,
        description: 'description',
        authors: [],
      },
    ];
  });

  describe('getCourses$', () => {
    it('should return getCoursesSuccess action with courses and total count', () => {
      const params = {}; // Set your desired params here
      const courses: ICourse[] = []; // Set your desired courses here
      const totalCount = 10; // Set your desired total count here

      const action = fromCourseActions.getCourses({ params });
      const completion = fromCourseActions.getCoursesSuccess({
        courses,
        totalCount,
      });

      actions$ = of(action);
      coursesService.getList.and.returnValue(
        of({
          body: courses,
          headers: {
            get: () => totalCount,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      );

      effects.getCourses$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });

    it('should return getCoursesFailure action if getList fails', () => {
      const params = {}; // Set your desired params here
      const error = 'Error message'; // Set your desired error message here

      const action = fromCourseActions.getCourses({ params });
      const completion = fromCourseActions.getCoursesFailure({ error });

      actions$ = of(action);
      coursesService.getList.and.returnValue(throwError(error));

      effects.getCourses$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('getCourseById$', () => {
    it('should return getCourseByIdSuccess action with the course', () => {
      const id = courses[0].id; // Set your desired course ID here
      const course: ICourse = courses[0]; // Set your desired course object here

      const action = fromCourseActions.getCourseById({ id });
      const completion = fromCourseActions.getCourseByIdSuccess({ course });

      actions$ = of(action);
      coursesService.getItemById.and.returnValue(of(course));

      effects.getCourseById$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });

    it('should return getCourseByIdFailure action if getItemById fails', () => {
      const id = courses[0].id + 1; // Set your desired course ID here
      const error = 'Error message'; // Set your desired error message here

      const action = fromCourseActions.getCourseById({ id });
      const completion = fromCourseActions.getCourseByIdFailure({ error });

      actions$ = of(action);
      coursesService.getItemById.and.returnValue(throwError(error));

      effects.getCourseById$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('createCourse$', () => {
    it('should return createCourseSuccess action with the created course', () => {
      const course: ICourse = courses[0]; // Set your desired course object here

      const action = fromCourseActions.createCourse({ course });
      const completion = fromCourseActions.createCourseSuccess({ course });

      actions$ = of(action);
      coursesService.createItem.and.returnValue(of(course));

      effects.createCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });

    it('should return createCourseFailure action if createItem fails', () => {
      const course: ICourse = courses[0]; // Set your desired course object here
      const error = 'Error message'; // Set your desired error message here

      const action = fromCourseActions.createCourse({ course });
      const completion = fromCourseActions.createCourseFailure({ error });

      actions$ = of(action);
      coursesService.createItem.and.returnValue(throwError(error));

      effects.createCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('updateCourse$', () => {
    it('should return updateCourseSuccess action with the updated course', () => {
      const id = courses[0].id; // Set your desired course ID here
      const course: ICourse = courses[0]; // Set your desired course object here

      const action = fromCourseActions.updateCourse({ id, course });
      const completion = fromCourseActions.updateCourseSuccess({ course });

      actions$ = of(action);
      coursesService.updateItem.and.returnValue(of(course));

      effects.updateCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });

    it('should return updateCourseFailure action if updateItem fails', () => {
      const id = courses[0].id; // Set your desired course ID here
      const course: ICourse = courses[0]; // Set your desired course object here
      const error = 'Error message'; // Set your desired error message here

      const action = fromCourseActions.updateCourse({ id, course });
      const completion = fromCourseActions.updateCourseFailure({ error });

      actions$ = of(action);
      coursesService.updateItem.and.returnValue(throwError(error));

      effects.updateCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  describe('deleteCourse$', () => {
    it('should return deleteCourseSuccess action with the deleted course ID', () => {
      const id = courses[0].id; // Set your desired course ID here

      const action = fromCourseActions.deleteCourse({ id });
      const completion = fromCourseActions.deleteCourseSuccess({ id });

      actions$ = of(action);
      coursesService.removeItem.and.returnValue(of(id));

      eventService.clearFiltersEvent.emit = jasmine.createSpy();

      effects.deleteCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
        expect(eventService.clearFiltersEvent.emit).toHaveBeenCalled();
      });
    });

    it('should return deleteCourseFailure action if removeItem fails', () => {
      const id = courses[0].id; // Set your desired course ID here
      const error = 'Error message'; // Set your desired error message here

      const action = fromCourseActions.deleteCourse({ id });
      const completion = fromCourseActions.deleteCourseFailure({ error });

      actions$ = of(action);
      coursesService.removeItem.and.returnValue(throwError(error));

      effects.deleteCourse$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });
});
