import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ICourse } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses.service';
import * as fromCourseActions from '../actions/course.actions';

@Injectable()
export class CourseEffects {
  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourseActions.getCourses),
      switchMap(({ params }) =>
        this.coursesService.getList(params).pipe(
          map((response) =>
            fromCourseActions.getCoursesSuccess({
              courses: response.body as ICourse[],
              totalCount: response.headers.get('X-Total-Count') as unknown as number,
            }),
          ),
          catchError((error) => of(fromCourseActions.getCoursesFailure({ error }))),
        ),
      ),
    ),
  );

  getCourseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourseActions.getCourseById),
      switchMap(({ id }) =>
        this.coursesService.getItemById(id).pipe(
          map((course) =>
            fromCourseActions.getCourseByIdSuccess({
              course: { ...course, creationDate: course.creationDate ? new Date(course.creationDate) : course.creationDate },
            }),
          ),
          catchError((error) => of(fromCourseActions.getCourseByIdFailure({ error }))),
        ),
      ),
    ),
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourseActions.createCourse),
      switchMap(({ course }) =>
        this.coursesService.createItem(course).pipe(
          map((course) =>
            fromCourseActions.createCourseSuccess({
              course,
            }),
          ),
          catchError((error) => of(fromCourseActions.createCourseFailure({ error }))),
        ),
      ),
    ),
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourseActions.updateCourse),
      switchMap(({ id, course }) =>
        this.coursesService.updateItem(id, course).pipe(
          map((course) =>
            fromCourseActions.updateCourseSuccess({
              course,
            }),
          ),
          catchError((error) => of(fromCourseActions.updateCourseFailure({ error }))),
        ),
      ),
    ),
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourseActions.deleteCourse),
      switchMap(({ id }) =>
        this.coursesService.removeItem(id).pipe(
          map(() => fromCourseActions.deleteCourseSuccess({ id })),
          catchError((error) => of(fromCourseActions.deleteCourseFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
