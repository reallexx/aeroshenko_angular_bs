import * as fromCourseActions from '../actions/course.actions';
import { initialState, reducer } from './course.reducers';

describe('Course Reducer', () => {
  const courses = [
    {
      id: 1,
      name: 'name',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [],
    },
  ];

  it('should return the initial state', () => {
    const action = {} as never;
    const state = reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle getCourses action', () => {
    const params = {
      param: 'value',
    };
    const action = fromCourseActions.getCourses({ params });
    const state = reducer(initialState, action);

    expect(state.params).toBe(params);
    expect(state.loading).toBe(true);
  });

  it('should handle getCoursesSuccess action', () => {
    const totalCount = 1;
    const action = fromCourseActions.getCoursesSuccess({ courses, totalCount });
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.courses).toEqual(courses);
    expect(state.totalCount).toBe(totalCount);
  });

  it('should handle getCoursesFailure action', () => {
    const error = 'An error occurred';
    const action = fromCourseActions.getCoursesFailure({ error });
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle getCourseById action', () => {
    const action = fromCourseActions.getCourseById({ id: courses[0].id });
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.id).toBe(courses[0].id);
  });

  it('should handle getCourseByIdSuccess action', () => {
    const action = fromCourseActions.getCourseByIdSuccess({ course: courses[0] });
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.course).toEqual(courses[0]);
  });

  it('should handle getCourseByIdFailure action', () => {
    const error = 'An error occurred';
    const action = fromCourseActions.getCourseByIdFailure({ error });
    const state = reducer(initialState, action);

    expect(state.error).toBe(error);
  });

  it('should handle createCourse action', () => {
    const action = fromCourseActions.createCourse({ course: courses[0] });
    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle createCourseSuccess action', () => {
    const action = fromCourseActions.createCourseSuccess({ course: courses[0] });
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.course).toEqual(courses[0]);
  });

  it('should handle createCourseFailure action', () => {
    const error = 'An error occurred';
    const action = fromCourseActions.createCourseFailure({ error });
    const state = reducer(initialState, action);

    expect(state.error).toBe(error);
  });

  it('should handle updateCourse action', () => {
    const action = fromCourseActions.updateCourse({ id: courses[0].id, course: courses[0] });
    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle updateCourseSuccess action', () => {
    const action = fromCourseActions.updateCourseSuccess({ course: courses[0] });
    const state = reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.course).toEqual(courses[0]);
  });

  it('should handle updateCourseFailure action', () => {
    const error = 'An error occurred';
    const action = fromCourseActions.updateCourseFailure({ error });
    const state = reducer(initialState, action);

    expect(state.error).toBe(error);
  });

  it('should handle deleteCourse action', () => {
    const action = fromCourseActions.deleteCourse({ id: courses[0].id });
    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle deleteCourseSuccess action', () => {
    const action = fromCourseActions.deleteCourseSuccess({ id: courses[0].id });
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.courses).toEqual([]);
  });

  it('should handle deleteCourseFailure action', () => {
    const error = 'An error occurred';
    const action = fromCourseActions.deleteCourseFailure({ error });
    const state = reducer(initialState, action);

    expect(state.error).toBe(error);
  });
});
