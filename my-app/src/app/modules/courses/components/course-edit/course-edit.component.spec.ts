import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { IAutor } from 'src/app/models/autor';
import { AutorsService } from 'src/app/services/autors.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { AuthorsComponent } from 'src/app/shared/components/authors/authors.component';
import { DurationComponent } from 'src/app/shared/components/duration/duration.component';
import { createCourse, getCourseById, updateCourse } from 'src/app/store/actions/course.actions';
import { CourseEditComponent } from './course-edit.component';

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;
  let router: Router;
  let store: Store;
  let breadcrumbsService: BreadcrumbsService;

  /*@Component({ selector: 'app-duration', template: '' })
  class DurationStubComponent {}*/

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseEditComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(),
        DurationComponent,
        CalendarModule,
        AuthorsComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore(), AutorsService, BreadcrumbsService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    breadcrumbsService = TestBed.inject(BreadcrumbsService);

    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all fields', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('label[for="name"]').textContent).toContain('Наименование *');
    expect(compiled.querySelector('input[id="name"]')).toBeTruthy();

    // Repeat this for other fields
  });

  it('should initialize form with correct initial values', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');

    // Repeat this for other fields
  });

  it('should call cancelAction() method when cancel button is clicked', () => {
    spyOn(component, 'cancelAction');
    const compiled = fixture.nativeElement;
    const cancelButton = compiled.querySelector('p-button[label="Отмена"]');
    cancelButton.click();
    expect(component.cancelAction).toHaveBeenCalled();
  });

  it('should navigate to /courses when cancelAction', () => {
    spyOn(router, 'navigate');
    component.cancelAction();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should call saveCourse() method when save button is clicked', () => {
    spyOn(component, 'saveCourse');
    const compiled = fixture.nativeElement;
    const saveButton = compiled.querySelector('p-button[label="Сохранить"]');
    saveButton.click();
    expect(component.saveCourse).toHaveBeenCalled();
  });

  it('should dispatch createCourse action when form is valid and mode is "add"', () => {
    component.mode = 'add';
    component.form.setValue({
      name: 'name',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [{ id: 1 }],
    });
    spyOn(store, 'dispatch');

    component.saveCourse();

    expect(store.dispatch).toHaveBeenCalledWith(
      createCourse({ course: { ...component.form.value, authors: component.form.value['authors'].map((item: IAutor) => item.id) } }),
    );
  });

  it('should dispatch updateCourse action when form is valid and mode is "update"', () => {
    component.mode = 'update';
    component.id = 1;
    component.form.setValue({
      name: 'name',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [{ id: 1 }],
    });
    spyOn(store, 'dispatch');

    component.saveCourse();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateCourse({ id: 1, course: { ...component.form.value, authors: component.form.value['authors'].map((item: IAutor) => item.id) } }),
    );
  });

  it('should not dispatch any action when form is invalid', () => {
    component.form.setValue({
      name: '',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [],
    });
    spyOn(store, 'dispatch');

    component.saveCourse();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should set the correct values and dispatch getCourseById action when route param "id" exists', () => {
    spyOn(store, 'select').and.returnValue(of(1));
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(component.caption).toEqual('Редактирование курса');
    expect(component.mode).toEqual('edit');
    expect(store.dispatch).toHaveBeenCalledWith(getCourseById({ id: Number(component.id) }));
  });
});
