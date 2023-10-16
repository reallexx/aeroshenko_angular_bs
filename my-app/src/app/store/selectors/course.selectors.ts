import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from '../reducers/course.reducers';

export const selectCoursesState = createFeatureSelector<fromCourse.State>(fromCourse.reducerFeatureKey);

export const selectLoading = createSelector(selectCoursesState, (state) => state.loading);
export const selectCourses = createSelector(selectCoursesState, (state) => state.courses);
export const selectTotalCount = createSelector(selectCoursesState, (state) => state.totalCount);
export const selectCourse = createSelector(selectCoursesState, (state) => state.course);

// if use adapter
export const selectAllCourses = createSelector(selectCoursesState, fromCourse.selectAll);
export const selectCourseEntities = createSelector(selectCoursesState, fromCourse.selectEntities);
export const selectCourseById = (id: string) => createSelector(selectCourseEntities, (entities) => entities[id]);
//
