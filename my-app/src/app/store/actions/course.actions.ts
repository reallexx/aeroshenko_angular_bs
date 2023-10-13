import { createAction, props } from '@ngrx/store';
import { ICourse } from 'src/app/models/course';
import { IRequest } from 'src/app/models/request';

export const getCourses = createAction('[Course] Get Courses', props<{ params: IRequest }>());

export const getCoursesSuccess = createAction('[Course] Get Courses Success', props<{ courses: ICourse[]; totalCount: number }>());

export const getCoursesFailure = createAction('[Course] Get Courses Failure', props<{ error: unknown }>());

export const getCourseById = createAction('[Course] Get Course By Id', props<{ id: number }>());

export const getCourseByIdSuccess = createAction('[Course] Get Course By Id Success', props<{ course: ICourse }>());

export const getCourseByIdFailure = createAction('[Course] Get Course By Id Failure', props<{ error: unknown }>());

export const createCourse = createAction('[Course] Create Course', props<{ course: ICourse }>());

export const createCourseSuccess = createAction('[Course] Create Course Success', props<{ course: ICourse }>());

export const createCourseFailure = createAction('[Course] Create Course Failure', props<{ error: unknown }>());

export const updateCourse = createAction('[Course] Update Course', props<{ id: number; course: ICourse }>());

export const updateCourseSuccess = createAction('[Course] Update Course Success', props<{ course: ICourse }>());

export const updateCourseFailure = createAction('[Course] Update Course Failure', props<{ error: unknown }>());

export const deleteCourse = createAction('[Course] Delete Course', props<{ id: number }>());

export const deleteCourseSuccess = createAction('[Course] Delete Course Success', props<{ id: number }>());

export const deleteCourseFailure = createAction('[Course] Delete Course Failure', props<{ error: unknown }>());

// if use adapter
export const selectCourse = createAction('[Course] Select Course', props<{ id: number | null }>());
//
