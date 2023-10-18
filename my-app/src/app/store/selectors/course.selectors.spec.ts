import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ICourse } from 'src/app/models/course';
import { IRequest } from 'src/app/models/request';
import * as fromCourse from '../reducers/course.reducers';
import { selectCourseById, selectCourses, selectCoursesState, selectLoading } from './course.selectors';

describe('CourseSelectors', () => {
  let store: MockStore;
  let state: fromCourse.State;
  const course = {
    id: 1,
    name: 'name',
    creationDate: new Date(),
    duration: 1,
    description: 'description',
    authors: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);

    state = {
      courses: [course],
      loading: true,
      params: {} as IRequest,
      totalCount: 10,
      id: null,
      course: {} as ICourse,
      error: null,
      selectedId: null,

      ids: [],
      entities: { [course.id]: course },
    };

    store.setState({ [fromCourse.reducerFeatureKey]: state });
  });

  it('should select courses state', () => {
    const selectedState = store.select(selectCoursesState);
    selectedState.subscribe((state) => {
      expect(state).toEqual(state);
    });
  });

  it('should select loading', () => {
    const selectedLoading = store.select(selectLoading);

    selectedLoading.subscribe((loading) => {
      expect(loading).toEqual(true);
    });
  });

  it('should select courses', () => {
    const selectedCourses = store.select(selectCourses);

    selectedCourses.subscribe((courses) => {
      expect(courses).toEqual(state.courses);
    });
  });

  it('should select course by id', () => {
    const selectedCourse = store.select(selectCourseById('1'));

    selectedCourse.subscribe((course) => {
      expect(course).toEqual(state.entities['1']);
    });
  });
});
