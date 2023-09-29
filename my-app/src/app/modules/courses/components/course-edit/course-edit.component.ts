import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/models/course';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  course = {} as ICourse;
  caption = 'Добавление курса';
  mode = 'add';
  courseId = undefined as unknown as number;

  constructor(
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
  ) {}

  get valid() {
    return this.course.name && this.course.description && this.course.duration && this.course.creationDate;
  }

  ngOnInit() {
    let breadcrumbLabel = 'Новый курс';

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.caption = 'Редактирование курса';
      this.mode = 'edit';
      this.coursesService.getItemById(Number(id)).subscribe((data) => {
        data.creationDate = new Date(data.creationDate);
        this.course = data;
      });
      breadcrumbLabel = this.course.name;
      this.courseId = Number(id);
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
    if (!this.valid) return;

    const navigateToCourses = () => this.router.navigate(['/courses']);

    if (this.mode === 'add') {
      this.coursesService.createItem(this.course).subscribe(navigateToCourses);
    } else {
      this.coursesService.updateItem(this.courseId, this.course).subscribe(navigateToCourses);
    }
  }
}
