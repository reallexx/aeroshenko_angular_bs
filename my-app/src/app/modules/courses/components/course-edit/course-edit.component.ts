import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, take, tap } from 'rxjs';
import { IAutor } from 'src/app/models/autor';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { selectRouteParam } from 'src/app/store';
import { createCourse, getCourseById, updateCourse } from 'src/app/store/actions/course.actions';
import { selectCourse, selectCourseById } from 'src/app/store/selectors/course.selectors';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  caption = 'Добавление курса';
  mode = 'add';
  id: number | undefined;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(6000)]],
    creationDate: [null, Validators.required],
    authors: [null, Validators.required],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get duration(): FormControl {
    return this.form.get('duration') as FormControl;
  }

  get creationDate(): FormControl {
    return this.form.get('creationDate') as FormControl;
  }

  get authors(): FormControl {
    return this.form.get('authors') as FormControl;
  }

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    const breadcrumbLabel = 'Новый курс';
    const breadcrumbData = {
      home: { label: 'Курсы', routerLink: '/courses' },
      items: [{ label: breadcrumbLabel }],
    };

    this.store
      .select(selectRouteParam('id'))
      .pipe(
        take(1),
        switchMap((id) => {
          if (id) {
            this.id = Number(id);
            this.caption = 'Редактирование курса';
            this.mode = 'edit';

            this.store.dispatch(getCourseById({ id: this.id }));

            return this.store.select(selectCourse).pipe(
              map((course) => {
                this.form.patchValue(course);
                breadcrumbData.items[0].label = course.name;
                this.breadcrumbsService.data = breadcrumbData;
              }),
            );
          } else {
            this.breadcrumbsService.data = breadcrumbData;
            return of(null);
          }
        }),
      )
      .subscribe();

    // if use adapter example
    // course
    this.store
      .select(selectRouteParam('id'))
      .pipe(
        take(1),
        switchMap((id) => {
          if (id) {
            return this.store.select(selectCourseById(id)).pipe(
              tap((course) => {
                console.log('currentCourse =', course);
              }),
            );
          } else {
            return of(null);
          }
        }),
      )
      .subscribe();
    //
  }

  cancelAction() {
    this.router.navigate(['/courses']);
  }

  saveCourse() {
    if (!this.form.valid) return;

    const authors = this.form.value['authors']?.map((item: IAutor) => item.id);
    const course = { ...this.form.value, authors };

    const dispatchAction = this.mode === 'add' ? createCourse({ course }) : updateCourse({ id: Number(this.id), course });

    this.store.dispatch(dispatchAction);
  }
}
