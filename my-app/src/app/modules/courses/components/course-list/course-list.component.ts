import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ICourse } from 'src/app/models/course';
import { IRequest } from 'src/app/models/request';
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
  public courses$ = new Subject<ICourse[]>();
  public totalCount$ = new BehaviorSubject<number>(0);
  public loading$ = new BehaviorSubject<boolean>(false);

  searchParams = {
    _page: 1,
    _limit: 5,
    _sort: 'creationDate',
    _order: 'asc',
    // name_like: searchString,
    // description_like: searchString,
    // q: this.searchString,
  };

  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.breadcrumbsService.data = {
      home: { label: 'Курсы' },
      items: [],
    };

    this.getCourses().subscribe();
  }

  getCourses(params: IRequest = this.searchParams) {
    this.loading$.next(true);
    return this.coursesService.getList(params).pipe(
      tap((response) => {
        this.courses$.next(response.body as ICourse[]);
        this.totalCount$.next(Number(response.headers.get('X-Total-Count')));
        this.loading$.next(false);
      }),
    );
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
    this.getCourses({ ...this.searchParams, _limit: (this.searchParams._limit += 5) }).subscribe();
  }

  searchCourse(searchString: string) {
    this.getCourses({ ...this.searchParams, q: searchString }).subscribe();
  }
}
