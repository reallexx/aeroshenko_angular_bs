import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ICourse } from 'src/app/models/course';
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

  constructor(private filterPipe: FilterPipe, private coursesService: CoursesService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
    this.filteredCourses = this.courses;
  }

  editCourse(course: ICourse) {
    console.log(course);
  }

  deleteCourse(id: number) {
    this.confirmationService.confirm({
      header: 'Удаление курса',
      message: 'Вы уверены, что хотите удалить курс?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
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
