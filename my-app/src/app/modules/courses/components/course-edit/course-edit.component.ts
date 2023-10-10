import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IAutor } from 'src/app/models/autor';
import { ICourse } from 'src/app/models/course';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  caption = 'Добавление курса';
  mode = 'add';
  courseId = Number(this.activatedRoute.snapshot.params['id']);
  course: ICourse = {} as ICourse;

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
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const breadcrumbLabel = 'Новый курс';
    const breadcrumbData = {
      home: { label: 'Курсы', routerLink: '/courses' },
      items: [{ label: breadcrumbLabel }],
    };

    if (this.courseId) {
      this.caption = 'Редактирование курса';
      this.mode = 'edit';
      this.coursesService
        .getItemById(this.courseId)
        .pipe(take(1))
        .subscribe((data) => {
          data.creationDate = new Date(data.creationDate);
          this.form.patchValue(data);
          this.course = data;
          breadcrumbData.items[0].label = data.name;
          this.breadcrumbsService.data = breadcrumbData;
        });
    } else {
      this.breadcrumbsService.data = breadcrumbData;
    }
  }

  cancelAction() {
    this.router.navigate(['/courses']);
  }

  saveCourse() {
    if (!this.form.valid) return;

    const navigateToCourses = () => this.router.navigate(['/courses']);

    if (this.form.value['authors']) {
      this.form.value['authors'] = this.form.value['authors'].map((item: IAutor) => item.id);
    }

    if (this.mode === 'add') {
      this.coursesService.createItem(this.form.value).pipe(take(1)).subscribe(navigateToCourses);
    } else {
      this.coursesService
        .updateItem(this.courseId, { ...this.course, ...this.form.value })
        .pipe(take(1))
        .subscribe(navigateToCourses);
    }
  }
}
