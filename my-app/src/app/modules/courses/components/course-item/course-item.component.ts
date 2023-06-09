import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course = {} as ICourse;

  @Output() edit = new EventEmitter<ICourse>();
  @Output() delete = new EventEmitter<number>();

  editCourse(course: ICourse) {
    this.edit.emit(course);
  }

  deleteCourse(id: number) {
    this.delete.emit(id);
  }
}
