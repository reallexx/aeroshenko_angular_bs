import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { EventService } from 'src/app/services/event.service';
import { deleteCourse, getCourses } from 'src/app/store/actions/course.actions';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let confirmationService: ConfirmationService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [RouterTestingModule],
      providers: [ConfirmationService, EventService, BreadcrumbsService, Store, Actions, provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  TODO: разобраться с ошибкой TypeError: Cannot read properties of undefined (reading 'ids')
  it('should dispatch getCourses action on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const getCoursesAction = getCourses({ params: component.searchParams });

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(getCoursesAction);
  });
  */

  it('should navigate to "courses/new" on addCourse', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.addCourse();

    expect(navigateSpy).toHaveBeenCalledWith(['courses/new']);
  });

  it('should navigate to "courses/:id" on editCourse', () => {
    const course = {
      id: 1,
      name: 'name',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [],
    };
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.editCourse(course);

    expect(navigateSpy).toHaveBeenCalledWith(['courses', course.id]);
  });

  it('should dispatch deleteCourse action on deleteCourse', () => {
    const id = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const confirmSpy = spyOn(confirmationService, 'confirm').and.callFake((options) => (options as any).accept());
    const dispatchSpy = spyOn(store, 'dispatch');
    const deleteCourseAction = deleteCourse({ id });

    component.deleteCourse(id);

    expect(confirmSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteCourseAction);
  });

  it('should dispatch getCourses action with updated searchParams on loadMore', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const getCoursesAction = getCourses({
      params: { ...component.searchParams, _limit: Number(component.searchParams['_limit']) + 5 },
    });

    component.loadMore();

    expect(dispatchSpy).toHaveBeenCalledWith(getCoursesAction);
  });

  it('should dispatch getCourses action with updated searchParams on searchCourse', () => {
    const searchString = 'example';
    const dispatchSpy = spyOn(store, 'dispatch');
    const getCoursesAction = getCourses({ params: { ...component.searchParams, q: searchString } });

    component.searchCourse(searchString);

    expect(dispatchSpy).toHaveBeenCalledWith(getCoursesAction);
  });
});
