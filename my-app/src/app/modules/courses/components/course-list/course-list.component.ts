import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { ICourse } from 'src/app/models/course';
import { IRequest } from 'src/app/models/request';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { EventService } from 'src/app/services/event.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { deleteCourse, getCourses } from 'src/app/store/actions/course.actions';
import { selectAllCourses, selectCourses, selectLoading, selectTotalCount } from 'src/app/store/selectors/course.selectors';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
})
export class CourseListComponent implements OnInit {
  loading$ = this.store.select(selectLoading);
  courses$ = this.store.select(selectCourses);
  totalCount$ = this.store.select(selectTotalCount);

  searchParams: IRequest = {
    _page: 1,
    _limit: 5,
    _sort: 'creationDate',
    _order: 'asc',
  };

  constructor(
    private confirmationService: ConfirmationService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private eventService: EventService,
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.breadcrumbsService.data = {
      home: { label: 'Курсы' },
      items: [],
    };

    this.store.dispatch(getCourses({ params: this.searchParams }));

    // if use adapter example
    // courses$
    this.store.select(selectAllCourses).subscribe((courses) => {
      console.log('allCourses =', courses);
    });
    //
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
        this.store.dispatch(deleteCourse({ id }));
      },
    });
  }

  loadMore() {
    this.searchParams = { ...this.searchParams, _limit: Number(this.searchParams['_limit']) + 5 };
    this.store.dispatch(getCourses({ params: this.searchParams }));
  }

  searchCourse(searchString: string) {
    this.store.dispatch(getCourses({ params: { ...this.searchParams, q: searchString } }));
  }
}
