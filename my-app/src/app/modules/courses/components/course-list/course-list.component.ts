import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ICourse } from 'src/app/models/course';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';
import { EventService } from 'src/app/services/event.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];
  page = 1;
  size = 5;
  totalCount = 0;
  searchString = '';
  loading = false;

  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private eventService: EventService,
  ) {}

  get showLoadMore() {
    return this.courses.length < this.totalCount;
  }

  ngOnInit(): void {
    this.breadcrumbsService.data = {
      home: { label: 'Курсы' },
      items: [],
    };

    this.getCourses();
  }

  getCourses({ search = false, loadMore = false } = {}) {
    this.loading = true;

    if (loadMore) {
      this.page++;
    }
    if (search) {
      this.page = 1;
      this.courses = [];
    }
    const params = {
      _page: this.page,
      _limit: this.size,
      _sort: 'creationDate',
      _order: 'asc',
      // name_like: searchString,
      // description_like: searchString,
      q: this.searchString,
    };
    this.coursesService.getList(params).subscribe((reaponse) => {
      this.courses = this.courses.concat(reaponse.body as ICourse[]);
      this.totalCount = Number(reaponse.headers.get('x-total-count'));
      this.loading = false;
    });
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
        this.coursesService.removeItem(id).subscribe(() => {
          this.eventService.clearFiltersEvent.emit();
        });
      },
    });
  }

  loadMore() {
    this.getCourses({ loadMore: true });
  }

  searchCourse(searchString: string) {
    this.searchString = searchString;
    this.getCourses({ search: true });
  }
}
