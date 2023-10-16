import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ICourse } from 'src/app/models/course';
import { IRequest } from 'src/app/models/request';
import * as fromCourseActions from '../actions/course.actions';

export const reducerFeatureKey = 'courses';

export interface State extends EntityState<ICourse> {
  loading: boolean;
  params: IRequest;
  courses: ICourse[];
  totalCount: number;
  id: number | null;
  course: ICourse;
  error: unknown;
  // if use adapter
  selectedId: number | null;
  //
}

export const adapter = createEntityAdapter<ICourse>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  params: {},
  courses: [],
  totalCount: 0,
  id: null,
  course: {} as ICourse,
  error: null,
  // if use adapter
  selectedId: null,
  //
});

export const reducer = createReducer(
  initialState,
  on(fromCourseActions.getCourses, (state, { params }) => ({ ...state, params, loading: true })),
  on(fromCourseActions.getCoursesSuccess, (state, { courses, totalCount }) => ({
    ...state,
    courses,
    totalCount,
    loading: false,
  })),
  on(fromCourseActions.getCoursesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(fromCourseActions.getCourseById, (state, { id }) => ({ ...state, id })),
  on(fromCourseActions.getCourseByIdSuccess, (state, { course }) => ({ ...state, course })),
  on(fromCourseActions.getCourseByIdFailure, (state, { error }) => ({ ...state, error })),

  on(fromCourseActions.createCourse, (state) => ({ ...state })),
  on(fromCourseActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    course,
  })),
  on(fromCourseActions.createCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(fromCourseActions.updateCourse, (state) => ({ ...state })),
  on(fromCourseActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    course,
  })),
  on(fromCourseActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(fromCourseActions.deleteCourse, (state) => ({ ...state })),
  on(fromCourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== id),
  })),
  on(fromCourseActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // if use adapter
  on(fromCourseActions.getCoursesSuccess, (state, { courses, totalCount }) =>
    adapter.setAll(courses, { ...state, totalCount, loading: false }),
  ),
  on(fromCourseActions.createCourseSuccess, (state, { course }) => adapter.addOne(course, { ...state })),
  on(fromCourseActions.updateCourseSuccess, (state, { course }) => adapter.updateOne({ id: course.id, changes: course }, { ...state })),
  on(fromCourseActions.deleteCourseSuccess, (state, { id }) => adapter.removeOne(id, { ...state })),
  //
);

// if use adapter
export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();
//
