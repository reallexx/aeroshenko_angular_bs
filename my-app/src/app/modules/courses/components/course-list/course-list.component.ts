import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ICourse } from 'src/app/models/course';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];

  constructor(
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.data = {
      home: { label: 'Курсы' },
      items: [],
    };

    this.courses = this.coursesService.getList();
    this.filteredCourses = this.courses;
  }

  addCourse() {
    this.router.navigate(['courses/new']);
  }

  editCourse(course: ICourse) {
    this.router.navigate(['courses', course.id]);
  }

  deleteCourse(id: number) {
    this.confirmationService.confirm({
      header: 'Удаление курса',
      message: 'Вы уверены, что хотите удалить курс?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonStyleClass: 'p-button-sm p-button-danger',
      rejectButtonStyleClass: 'p-button-sm p-button-secondary p-button-outlined',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.coursesService.removeItem(id);
      },
    });
  }

  loadMore() {
    console.log('load more');
  }

  searchCourse(searchString: string) {
    if (searchString === '') {
      this.filteredCourses = this.courses;
      return;
    }
    this.filteredCourses = this.filterPipe.transform(this.courses, 'name', searchString);
  }
}
