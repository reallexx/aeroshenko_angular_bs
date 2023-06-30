import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/models/course';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  course = {} as ICourse;
  caption = 'Добавление курса';
  mode = 'add';

  constructor(
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  get valid() {
    return this.course.name && this.course.description && this.course.duration && this.course.creationDate;
  }

  ngOnInit(): void {
    let breadcrumbLabel = 'Новый курс';

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.caption = 'Редактирование курса';
      this.mode = 'edit';
      this.course = this.coursesService.getItemById(Number(id));
      breadcrumbLabel = this.course.name;
    }

    this.breadcrumbsService.data = {
      home: { label: 'Курсы', routerLink: '/courses' },
      items: [{ label: breadcrumbLabel }],
    };
  }

  cancelAction() {
    this.router.navigate(['/courses']);
  }

  saveCourse() {
    if (!this.valid) {
      return;
    }
    if (this.mode === 'add') {
      this.coursesService.createCourse(this.course);
    } else {
      this.coursesService.updateItem(this.course);
    }
    this.router.navigate(['/courses']);
  }
}
